import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

// Endpoint for product API'S
const endPoint = 'http://localhost:3000/products/';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  // BehaviourSubject to update view
  dataChanged = new BehaviorSubject(false);

  // BehaviourSubject to show/hide loader
  isShowLoader = new BehaviorSubject(true);

  /**
   * Function to display snackbar message
   * Params : message, type
   * Return : None
   */
  openSnackBar(message: string, type: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: [type, 'text-white'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  /**
   * Function to fetch list of products
   * Params : None
   * Return : Observable
   */
  getProductsList(): Observable<any> {
    return this.http.get(endPoint);
  }

  /**
   * Function to create new product
   * Params : data to be saved
   * Return : Observable
   */
  createNewProduct(data: object): Observable<any> {
    return this.http.post(endPoint, data);
  }

  /**
   * Function to delete product
   * Params : id
   * Return : Observable
   */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(endPoint + id);
  }

  /**
   * Function to update the product data
   * Params : id, data
   * Return : Observable
   */
  updateProduct(id: number, data: object): Observable<any> {
    return this.http.put(endPoint + id, data);
  }
}
