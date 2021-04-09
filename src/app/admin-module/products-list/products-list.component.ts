import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsComponent implements OnInit {

  private productsList : Array<any> = [];
  private productsListCopy : Array<any> = [];
  private searchText: string = '';
  
  constructor(public dialog: MatDialog,public appService: AppService) { }

  ngOnInit() {
    this.getProductsList();
    this.appService.dataChanged.subscribe((res) => {
      if(res){
        this.getProductsList();
      }
    })
  }

  getProductsList(){
    this.appService.getProductsList().subscribe((response:any) => {
      this.productsList = response;
      this.productsListCopy = response;
      this.appService.isShowLoader.next(false);
    },
    (error) => {
        console.log(error);
        this.appService.isShowLoader.next(false);
        this.appService.openSnackBar('Something went wrong, please try again later....','bg-danger');
    });
  }

  openDialog(method,element): void {
    this.dialog.open(ProductEditModalComponent, {
      width: (method != 'delete') ? '450px' : 'auto',
      data: {operation:method,formData : (method === 'create')? '' : element }
    });
  }

  filterProducts(){
    if(!this.searchText){
      this.productsList = this.productsListCopy;
    } else {
      this.productsList = this.productsListCopy.filter((product) => 
          product.name.includes(this.searchText)
      )
    }
  }

}
