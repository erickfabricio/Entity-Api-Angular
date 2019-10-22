import { Component, OnInit, EventEmitter, Output, Input  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { EntityService } from 'src/app/entity/services/entity.service';
import { UserModel } from 'src/app/entity/models/user.model';

@Component({
  selector: 'entity-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {

  //Input
  @Input('action') action: string;
  @Input('user') user: UserModel;
  
  //Form
  title: string;
  form: FormGroup;
  visibleControls;
  
  //Process
  @Output() isUpdateList = new EventEmitter<boolean>();
  
  updateList(isUpdate: boolean) {
    if(isUpdate){
      this.isUpdateList.emit(isUpdate);
    }    
    //Hide modal
    this.modal.hide();
    this.form.reset();
  }

  constructor(public modal: BsModalRef, private entityService: EntityService) { }

  ngOnInit() {
    
    console.log("Action:" + this.action);
    console.log("User:" + this.user);

    //Default
    this.visibleControls = {
      id: true,
      name: true
    };

    //Action
    switch (this.action) {
      case "CREATE":
        this.create();
        break;
      case "READ":
        this.read();
        break;
      case "UPDATE":
        this.update();
        break;
      case "DELETE":
        this.delete();
        break;
    }

  }

  //************ FORM OF MODAL ************//

  create() {
    this.title = "Create user";

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required])
    });

    this.visibleControls.id = false;

  }

  read() {
    this.title = "Read user";

    this.form = new FormGroup({
      id: new FormControl({ value: this.user.id, disabled: true }),
      name: new FormControl({ value: this.user.name, disabled: true })
    });

  }

  update() {
    this.title = "Update user";

    this.form = new FormGroup({
      id: new FormControl({ value: this.user.id, disabled: true }),
      name: new FormControl(this.user.name, [Validators.required])
    });

  }

  delete() {
    this.title = "Delete user";

    this.form = new FormGroup({
      id: new FormControl({ value: this.user.id, disabled: true }),
      name: new FormControl({ value: this.user.name, disabled: true })
    });

  }

  //************ ACTIONS OF MODAL ************//

  onCreate() {
    if (this.form.valid) {
      console.log("Valid");

      //Assignment of values
      this.user = new UserModel();
      //this.user.id = String(this.form.get('id').value).trim();      
      this.user.name = String(this.form.get('name').value).trim();

      //Api 
      this.entityService.save(UserModel.entity, this.user)
        .subscribe(user => { console.log("New user"); this.user = <UserModel>user; this.updateList(true) });
      
    } else {
      console.log("No valid");
    }
  }

  onUpdate() {
    if (this.form.valid) {
      console.log("Valid");

      //Assignment of values      
      //this.user.id = String(this.form.get('id').value).trim();      
      this.user.name = String(this.form.get('name').value).trim();

      //Api 
      this.entityService.update(UserModel.entity, this.user.id, this.user)
        .subscribe(user => { console.log("Update user"); this.user = <UserModel>user; this.updateList(false) });

    } else {
      console.log("No valid");
    }
  }

  onDelete() {
    //Api
    this.entityService.remove(UserModel.entity, this.user.id)
      .subscribe(user => { this.user = <UserModel>user; console.log("Delete user"); this.updateList(true) });
  }

}
