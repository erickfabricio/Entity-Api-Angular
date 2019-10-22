import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { EntityService } from 'src/app/entity/services/entity.service';
import { UserModel } from 'src/app/entity/models/user.model';

@Component({
  selector: 'user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {

  entity: string;
  user: UserModel;
  action: string;
  title: string;
  form: FormGroup;
  visibleControls;
  process: boolean;

  constructor(private modal: BsModalRef, private entityService: EntityService) { }

  ngOnInit() {

    this.entity = "users";

    console.log("Action:" + this.action);
    console.log("user:" + this.user);

    //Default
    this.visibleControls = {
      id: true,
      name: true
    };

    this.process = false;

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
      this.entityService.save(this.entity, this.user)
        .subscribe(user => { console.log("New user:" + user); this.user = <UserModel>user });

      //Process
      this.process = true;

      //Hide modal      
      this.modal.hide();
      this.form.reset();

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
      this.entityService.update(this.entity, this.user.id, this.user)
        .subscribe(user => { console.log("Update user:" + user); this.user = <UserModel>user });

      //Process
      this.process = false; //No es necesario actualizar la lista

      //Hide modal      
      this.modal.hide();
      this.form.reset();

    } else {
      console.log("No valid");
    }
  }

  onDelete() {

    //Api 
    this.entityService.remove(this.entity, this.user.id)
      .subscribe(user => { console.log("Delete user:" + user); this.user = <UserModel>user });

    //Process
    this.process = true;

    //Hide modal      
    this.modal.hide();
    this.form.reset();

  }

}
