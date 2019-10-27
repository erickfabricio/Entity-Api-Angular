import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { EntityModule } from '../entity/entity.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [DashboardComponent, MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    EntityModule
    
  ]
})
export class MainModule { }
