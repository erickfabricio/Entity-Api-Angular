import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EntityRoutingModule } from './entity-routing.module';

import { TestEntityComponent } from './test/test-entity/test-entity.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCrudComponent } from './components/user/user-crud/user-crud.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ListComponent } from './components/list/list.component';



@NgModule({
  declarations: [TestEntityComponent, UserListComponent, UserCrudComponent, ListComponent],
  imports: [
    CommonModule,
    EntityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    TestEntityComponent
  ],
  entryComponents: [UserCrudComponent]
})
export class EntityModule { }
