import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AdminModule } from './admin-module/admin.module';
import { ProductsComponent } from './products-list/products-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
