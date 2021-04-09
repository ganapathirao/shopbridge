import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

const endPoint = 'http://localhost:3000/products/';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(
    private http:HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  dataChanged = new BehaviorSubject(false);
  // isProductsUpdated = this.dataChanged.asObservable();

   isShowLoader= new BehaviorSubject(true);
  //  dataUpdated = this.isShowLoader.asObservable();

  openSnackBar(message:string,type:string) {
    this._snackBar.open(message,'', {
      duration: 3000,
      panelClass: [type,'text-white'],
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  getProductsList(){
    return this.http.get(endPoint);
  }

  createNewProduct(data:Object){
    return this.http.post(endPoint,data);
  }

  deleteProduct(id:number){
    return this.http.delete(endPoint+id);
  }

  updateProduct(id:number,data:Object){ 
    return this.http.put(endPoint+id,data);
  }
}
