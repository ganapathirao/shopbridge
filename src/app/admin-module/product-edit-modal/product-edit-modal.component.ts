import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss']
})
export class ProductEditModalComponent implements OnInit {

  // Creating product form controls
  public productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [null, [Validators.required, Validators.pattern('[0-9]*')]],
    currencySymbol: ['$']
  });

  public formValues: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.productForm.patchValue(this.data.formData);
    this.formValues = { ...this.data.formData };
    delete this.formValues.id;
  }

  /**
   * Function to create a new item
   * Params : None
   * Return : None
  */
  createItem(): void {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      return;
    }
    this.appService.isShowLoader.next(true);
    const data = Object.assign({ ...this.productForm.value }, { id : Math.floor(Math.random() * 1000) });
    this.appService.createNewProduct(data).subscribe(() => {
      this.appService.dataChanged.next(true);
      this.appService.openSnackBar('Product successfully created', 'bg-success');
      this.dialogRef.close();
      this.appService.isShowLoader.next(false);
    },
      () => {
        this.appService.openSnackBar('Something went wrong, please try again later....', 'bg-danger');
        this.dialogRef.close();
        this.appService.isShowLoader.next(false);
      });
  }

  /**
   * Function to delete product
   * Params : id
   * Return : None
  */
  deleteItem(id: number): void {
    this.appService.isShowLoader.next(true);
    this.appService.deleteProduct(id).subscribe(() => {
      this.appService.dataChanged.next(true);
      this.appService.openSnackBar('Product successfully deleted....', 'bg-success');
      this.dialogRef.close();
      this.appService.isShowLoader.next(false);
    },
      () => {
        this.appService.openSnackBar('Something went wrong, please try again later....', 'bg-danger');
        this.dialogRef.close();
        this.appService.isShowLoader.next(false);
      });
  }

  /**
   * Function to update the product
   * Params : None
   * Return : None
  */
  updateItem(): void {
    this.appService.isShowLoader.next(true);
    if (this.data && this.data.formData && this.productForm.valid) {
      const id = this.data.formData.id;
      const data = this.productForm.value;
      this.appService.updateProduct(id, data).subscribe(() => {
        this.appService.dataChanged.next(true);
        this.appService.openSnackBar('Product successfully updated', 'bg-success');
        this.dialogRef.close();
        this.appService.isShowLoader.next(false);
      },
        () => {
          this.appService.openSnackBar('Something went wrong, please try again later....', 'bg-danger');
          this.dialogRef.close();
          this.appService.isShowLoader.next(false);
        });
    } else {
      this.appService.isShowLoader.next(false);
    }
  }

  /**
   * Function to sort the array by it's keys
   * Params : array which needs to be sort
   * Return : sorted array
  */
  orderByKey(array: Array<any>): any {
    const ordered = Object.keys(array).sort().reduce(
      (obj, key) => {
        obj[key] = array[key];
        return obj;
      },
      {}
    );
    return ordered;
  }

  /**
   * Function to check the form values changed or not.
   * Params : None
   * Return : Boolean
  */
  isFormUpdated(): boolean {
    const formValues = JSON.stringify(this.orderByKey(this.productForm.value));
    const origionalValues = JSON.stringify(this.orderByKey(this.formValues));
    return formValues === origionalValues;
  }

}
