import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatTabChangeEvent, MatTabNav } from '@angular/material/tabs';
import { ListComponent } from '../list/list.component';
import { CrudComponent } from '../crud/crud.component';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild("tabGroup", {static:true}) tabGroup;  
  @ViewChild("tabList", {static:true}) tabList;
  @ViewChild("list", {static:true}) list: ListComponent;  
  @ViewChild("tabCrud", {static:true}) tabCrud;
  @ViewChild("crud", {static:true}) crud: CrudComponent;

  constructor() { }

  ngOnInit() {
    this.captureEvent();    
  }
  
  captureEvent(){    
    this.list.event.pipe().subscribe(data => {
      //Data      
      console.log(data.action);
      console.log(data.user);
      
      //Send data to CRUD
      this.crud.action = data.action;
      this.crud.user = data.user;
      
      //Change and enable tag
      this.tabCrud.textLabel = "Crud " + data.action;
      this.tabCrud.disabled = false;
      this.tabGroup.selectedIndex = 1
    });
  }
  
  onChangeTab(event: MatTabChangeEvent) {
    console.log("Tag change:" + event.tab.textLabel);
    if(this.tabGroup.selectedIndex == 0){
      this.tabCrud.textLabel = "";
      this.tabCrud.disabled = true;
    }    
  }

}
