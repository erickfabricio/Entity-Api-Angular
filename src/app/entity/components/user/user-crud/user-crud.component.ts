import { Component, OnInit, EventEmitter, Output, Input  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { EntityService } from 'src/app/entity/services/entity.service';
import { UserModel } from 'src/app/entity/models/user.model';
import { MyErrorStateMatcher } from 'src/app/entity/models/error.validate.interface';

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
  matcher: MyErrorStateMatcher;
  hide = true;
  
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
      name: true,
      age: true,
      mail: true,
      password: true,
      description: true,
      state: true
    };

    this.matcher = new MyErrorStateMatcher();

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
      name: new FormControl('', [Validators.required]),
      age: new FormControl(0, [Validators.required]),
      mail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required])
    });
    
    this.visibleControls.id = false;
  }

  read() {
    this.title = "Read user";

    this.form = new FormGroup({
      id: new FormControl({ value: this.user.id, disabled: true }),
      name: new FormControl({ value: this.user.name, disabled: true }),
      age: new FormControl({ value: this.user.age, disabled: true }),
      mail: new FormControl({ value: this.user.mail, disabled: true }),
      password: new FormControl({ value: this.user.password, disabled: true }),
      description: new FormControl({ value: this.user.description, disabled: true }),
      state: new FormControl({ value: this.user.state, disabled: true })
    });

  }

  update() {
    this.title = "Update user";

    this.form = new FormGroup({
      id: new FormControl({ value: this.user.id, disabled: true }),
      name: new FormControl(this.user.name, [Validators.required]),
      age: new FormControl(this.user.age, [Validators.required]),
      mail: new FormControl(this.user.mail, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
      description: new FormControl(this.user.description, [Validators.required]),
      state: new FormControl(this.user.state, [Validators.required])
    });

  }

  delete() {
    this.title = "Delete user";

    this.form = new FormGroup({
      id: new FormControl({ value: this.user.id, disabled: true }),
      name: new FormControl({ value: this.user.name, disabled: true }),
      age: new FormControl({ value: this.user.age, disabled: true }),
      mail: new FormControl({ value: this.user.mail, disabled: true }),
      password: new FormControl({ value: this.user.password, disabled: true }),
      description: new FormControl({ value: this.user.description, disabled: true }),
      state: new FormControl({ value: this.user.state, disabled: true })
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
      this.user.age = this.form.get('age').value;
      this.user.mail = this.form.get('mail').value;
      this.user.password = this.form.get('password').value;
      this.user.description = this.form.get('description').value;
      this.user.state = this.form.get('state').value;

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
      this.user.age = this.form.get('age').value;
      this.user.mail = this.form.get('mail').value;
      this.user.password = this.form.get('password').value;
      this.user.description = this.form.get('description').value;
      this.user.state = this.form.get('state').value;

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
