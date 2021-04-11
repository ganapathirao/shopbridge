import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { AppService } from 'src/app/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  // Creating public variables
  public productsList: Array<any> = [];
  public productsListCopy: Array<any> = [];
  public searchText: string;
  public productsListSubscription$: Subscription;
  constructor(
    public dialog: MatDialog,
    public appService: AppService
  ) { }

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
    this.productsListSubscription$ = this.appService.getProductsList().subscribe((response: any) => {
      this.productsListCopy = response;
      if (!this.searchText) {
        this.productsList = response;
      } else {
        this.filterProducts();
      }
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
      data: { operation: method, formData: (method === 'create') ? '' : element }
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
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  /**
   * Function to unsubscribe observable subscriptions.
   * Params : None
   * Return : None
   */
  ngOnDestroy(): void {
    this.productsListSubscription$.unsubscribe();
  }
}
