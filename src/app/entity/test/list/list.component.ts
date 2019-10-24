import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  user: UserModel;

  @Output() event = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.user = new UserModel();
    this.user.id = "1";
    this.user.name = "Erick";
  }

  emitirEvento(action: string, user: UserModel) {    
    return this.event.emit({action, user});
  }

}
