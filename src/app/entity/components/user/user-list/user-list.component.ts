import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserModel } from 'src/app/entity/models/user.model';
import { EntityService } from 'src/app/entity/services/entity.service';
import { UserCrudComponent } from '../user-crud/user-crud.component';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  entity: string = "users";

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
    this.entityService.find(this.entity)
      .subscribe(users => { console.log(users); this.users = <UserModel[]>users });
  }

  showModalCrud(action: string, user: UserModel) {

    this.modal = this.modalService.show(UserCrudComponent, {
      initialState: {
        action: action,
        user: user
      }
    });

    
    //ERROR corregir
    //Evento al ocultar el modal
    this.modalService.onHide
      .pipe().subscribe(rep => {
                
        console.log("Process:" + this.modal.content.process);
                
        if (this.modal.content.process) {
          this.find(); //Update list          
        }

        //Delete modal 
        this.modal.content.process = false;
        console.log("modals:" + this.modalService.getModalsCount());
        this.modalService.removeBackdrop();

      });
  }

}
