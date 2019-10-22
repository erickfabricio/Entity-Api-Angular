import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserModel } from 'src/app/entity/models/user.model';
import { EntityService } from 'src/app/entity/services/entity.service';
import { UserCrudComponent } from '../user-crud/user-crud.component';

@Component({
  selector: 'entity-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  //List
  users: UserModel[];

  //CRUD
  modal: BsModalRef;
  user: UserModel;

  constructor(private entityService: EntityService, private modalService: BsModalService) { }

  ngOnInit() {
    this.find();
  }

  find() {
    this.entityService.find(UserModel.entity)
      .subscribe(users => { console.log("UserListComponent.find->"), console.log(users); this.users = <UserModel[]>users });
  }

  showModalCrud(action: string, user: UserModel) {

    this.modal = this.modalService.show(UserCrudComponent, {
      initialState: {
        action: action,
        user: user
      }
    });
    
    this.modal.content.isUpdateList.pipe().subscribe(isUpdate => {           
      if(isUpdate){
        this.find();
      }      
    });
    
  }

}
