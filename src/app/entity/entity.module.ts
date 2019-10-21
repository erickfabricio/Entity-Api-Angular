import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityRoutingModule } from './entity-routing.module';
import { TestEntityComponent } from './test/test-entity/test-entity.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestEntityComponent],
  imports: [
    CommonModule,
    EntityRoutingModule,
    FormsModule
  ],
  exports: [
    TestEntityComponent
  ]
})
export class EntityModule { }
