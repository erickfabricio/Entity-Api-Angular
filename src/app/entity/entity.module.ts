import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EntityRoutingModule } from './entity-routing.module';

import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCrudComponent } from './components/user/user-crud/user-crud.component';
import { MaterialModule } from '../material.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductCrudComponent } from './components/product/product-crud/product-crud.component';

@NgModule({
  declarations: [UserListComponent, UserCrudComponent, ProductListComponent, ProductCrudComponent],
  imports: [
    CommonModule,
    EntityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    MaterialModule,
    AlertModule.forRoot()
  ],
  exports: [
    UserListComponent, UserCrudComponent, ProductListComponent, ProductCrudComponent
  ],
  entryComponents: [UserCrudComponent, ProductCrudComponent]
})
export class EntityModule { }
