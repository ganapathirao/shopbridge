import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Defining Routes for the site
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./admin-module/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
