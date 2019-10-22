import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestEntityComponent } from './test/test-entity/test-entity.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

const routes: Routes = [
   { path: '', component : TestEntityComponent },
   { path: 'user', component : UserListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
