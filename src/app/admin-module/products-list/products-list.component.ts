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

  // Creating public variables
  public productsList: Array<any> = [];
  public productsListCopy: Array<any> = [];
  public searchText: string;

  constructor(
    public dialog: MatDialog,
    public appService: AppService
  ) {}

  ngOnInit() {
    this.getProductsList();

    /* Subscribing to BehaviorSubject to update the products
        when edit / create / delete peformed */
    this.appService.dataChanged.subscribe((response) => {
      if (response) {
        this.getProductsList();
      }
    });
  }

  /**
   * Function to get products list
   * Params : None
   * Return : None
   */
  getProductsList(): void {
    this.appService.getProductsList().subscribe((response: any) => {
      this.productsList = response;
      this.productsListCopy = response;
      this.appService.isShowLoader.next(false);
    },
    () => {
        this.appService.isShowLoader.next(false);
        this.appService.openSnackBar('Something went wrong, please try again later....', 'bg-danger');
    });
  }
  /**
   * Function to open product edit/create/delete modal
   * Params : method,element
   * Return : None
   */
  openDialog(method: string, element: object): void {
    this.dialog.open(ProductEditModalComponent, {
      width: (method !== 'delete') ? '450px' : 'auto',
      data: {operation: method, formData: (method === 'create') ? '' : element }
    });
  }

  /**
   * Function to filter products by name.
   * Params : None
   * Return : None
   */
  filterProducts(): void {
    if (!this.searchText) {
      this.productsList = this.productsListCopy;
    } else {
      this.productsList = this.productsListCopy.filter((product) =>
          product.name.includes(this.searchText)
      );
    }
  }

}
