import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss']
})
export class ProductEditModalComponent implements OnInit {

  private productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price:[null , [Validators.required , Validators.pattern('[0-9]*')]],
    currencySymbol: ['$']
  });

  private formValues:any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private appService:AppService
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.productForm.patchValue(this.data.formData);
    this.formValues = {...this.data.formData};
    delete this.formValues['id'];
  }


  createItem(){
    this.productForm.markAllAsTouched();
    if(this.productForm.invalid)
      return;
    this.appService.isShowLoader.next(true);
    let data = Object.assign({...this.productForm.value},{"id":Math.floor(Math.random()*1000)})
    this.appService.createNewProduct(data).subscribe(() => {
      this.appService.dataChanged.next(true);
      this.appService.openSnackBar('Product successfully created','bg-success');
      this.dialogRef.close();
      this.appService.isShowLoader.next(false);
    },
    (error) => {
      console.log(error);
      this.appService.openSnackBar('Something went wrong, please try again later....','bg-danger');
      this.dialogRef.close();
      this.appService.isShowLoader.next(false);
    });
  }

  deleteItem(id){
    this.appService.isShowLoader.next(true);
    this.appService.deleteProduct(id).subscribe(() => {
      this.appService.dataChanged.next(true);
      this.appService.openSnackBar('Product successfully deleted....','bg-success');
      this.dialogRef.close();
      this.appService.isShowLoader.next(false);
    },
    (error) => {
      console.log(error);
      this.appService.openSnackBar('Something went wrong, please try again later....','bg-danger');
      this.dialogRef.close();
      this.appService.isShowLoader.next(false);
    })
  }

  updateItem(){
    this.appService.isShowLoader.next(true);
    if(this.data && this.data.formData && this.productForm.valid){
      let id = this.data.formData.id;
      let data = this.productForm.value;
      this.appService.updateProduct(id,data).subscribe(res => {
        this.appService.dataChanged.next(true);
        this.appService.openSnackBar('Product successfully updated','bg-success');
        this.dialogRef.close();
        this.appService.isShowLoader.next(false);
      },
      (error) => {
        console.log(error);
        this.appService.openSnackBar('Something went wrong, please try again later....','bg-danger');
        this.dialogRef.close();
        this.appService.isShowLoader.next(false);
      })
    } else {
      this.appService.isShowLoader.next(false);
    }
  }

  orderByKey(array){
    let ordered = Object.keys(array).sort().reduce(
      (obj, key) => { 
        obj[key] = array[key]; 
        return obj;
      }, 
      {}
    );
    return ordered;
  }

  isFormUpdated(){
    let formValues = JSON.stringify(this.orderByKey(this.productForm.value));
    let origionalValues = JSON.stringify(this.orderByKey(this.formValues));
    return formValues === origionalValues;
  }

}
