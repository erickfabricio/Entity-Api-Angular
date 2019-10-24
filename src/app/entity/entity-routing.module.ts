import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './components/user/user-list/user-list.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductCrudComponent } from './components/product/product-crud/product-crud.component';


const routes: Routes = [   
   { path: 'user', component : UserListComponent },
   { path: 'product', component : ProductListComponent },
   { path : 'product/:action/:id', component: ProductCrudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
