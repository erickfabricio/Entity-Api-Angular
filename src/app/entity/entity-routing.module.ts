import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestEntityComponent } from './test/test-entity/test-entity.component';

const routes: Routes = [
   { path: '', component : TestEntityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
