import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './components/user/user-list/user-list.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductCrudComponent } from './components/product/product-crud/product-crud.component';
import { MainComponent } from './test/main/main.component';


const routes: Routes = [
  { path: 'test', component: MainComponent },
  { path: 'user', component: UserListComponent },
  { path: 'product', component: ProductListComponent },
  { path :'product/:action', component: ProductCrudComponent },
  { path :'product/:action/:id', component: ProductCrudComponent }
  /*
  { path: 'product/create', component: ProductCrudComponent },
  { path: 'product/read/:id', component: ProductCrudComponent },
  { path: 'product/update/:id', component: ProductCrudComponent },
  { path: 'product/delete/:id', component: ProductCrudComponent } 
  */
 //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
