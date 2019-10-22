import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { EntityService } from '../../services/entity.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'test-entity',
  templateUrl: './test-entity.component.html',
  styleUrls: ['./test-entity.component.css']
})
export class TestEntityComponent implements OnInit {

  entity: string;
  id: string;  
  users: UserModel[];
  user: UserModel;
  
  constructor(private entityService: EntityService) {  }

  enter(){
    console.log(this.entity);    
  }
  
  ngOnInit() {
  }

  find() {
    this.entityService.find(this.entity)
      .subscribe(users => { console.log(users); this.users = <UserModel[]>users });
  }

  findById() {    
    this.entityService.findById(this.entity, this.id)
      .subscribe(user => { console.log(user); this.user = <UserModel>user });
  }

}
