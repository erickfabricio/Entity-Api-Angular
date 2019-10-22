import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EntityRoutingModule } from './entity-routing.module';

import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCrudComponent } from './components/user/user-crud/user-crud.component';

@NgModule({
  declarations: [UserListComponent, UserCrudComponent],
  imports: [
    CommonModule,
    EntityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    
  ],
  entryComponents: [UserCrudComponent]
})
export class EntityModule { }
