import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductCrudComponent } from '../product-crud/product-crud.component';

@Component({
  selector: 'entity-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.css']
})
export class ProductMainComponent implements OnInit {

  @ViewChild("tabGroup", { static: true }) tabGroup;
  @ViewChild("tabList", { static: true }) tabList;
  @ViewChild("list", { static: true }) list: ProductListComponent;
  @ViewChild("tabCrud", { static: true }) tabCrud;
  @ViewChild("crud", { static: true }) crud: ProductCrudComponent;

  constructor() { }

  ngOnInit() {
    this.captureEventList();
    this.captureEventCrud();    
  }

  captureEventList() {
    this.list.eventCrud.pipe().subscribe(data => {
      //Data      
      console.log(data.action);
      console.log(data.product);

      //Send data to CRUD
      this.crud.action = data.action;
      this.crud.product = data.product;
      this.crud.show();

      //Change and enable tag
      this.tabCrud.textLabel = "Crud " + data.action;
      this.tabCrud.disabled = false;
      this.tabGroup.selectedIndex = 1;
    });
  }

  captureEventCrud() {
    this.crud.eventUpdateList.pipe().subscribe(isUpdateList => {
      //Data
      console.log("Update list:" + isUpdateList);
      
      if (isUpdateList) {
        this.list.find();
      };

      if (this.crud.action == "DELETE") {
        this.tabGroup.selectedIndex = 0;
      }
      
    });    
  }

  onChangeTab(event: MatTabChangeEvent) {
    console.log("Tag change:" + event.tab.textLabel);
    if (this.tabGroup.selectedIndex == 0) {
      this.tabCrud.textLabel = "";
      this.tabCrud.disabled = true;
    }
  }  

}
