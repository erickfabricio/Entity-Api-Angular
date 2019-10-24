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


  //@ViewChild(ListComponent, {static: true}) list: ListComponent;
  //@ViewChild(CrudComponent, {static: false}) crud: CrudComponent;

  constructor() { }

  ngOnInit() {
    console.log(this.list);
    
    //Capturar evento 
    this.list.evento.pipe().subscribe(data => {
      console.log("Capturar evento del hijo data: " + data);

      console.log(data.action);
      console.log(data.user);


      //Cambiar de tag
      this.crud.action = data.action;
      this.crud.user = data.user;

      //Cambiar de tag
      this.tabCrud.textLabel = "Crud " + data.action;
      this.tabGroup.selectedIndex = 1      

    });

  }
  
  
  onSequenceChangeEvent(event: MatTabChangeEvent) {
    if(this.tabGroup.selectedIndex == 0){
      this.tabCrud.textLabel = "";
    }
    console.log(event.tab.textLabel);
  }
}
