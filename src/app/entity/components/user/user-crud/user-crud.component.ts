import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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

  //Process
  @Output() isUpdateList = new EventEmitter<boolean>();

  //Form
  title: string;
  form: FormGroup;
  visibleControls;
  hide = true; //Password

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
      state: true,
      date: true
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
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      age: new FormControl(0, [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      state: new FormControl(''),
      date: new FormControl('')
    });

    this.visibleControls.id = false;
    this.visibleControls.date = false;
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
      state: new FormControl({ value: this.user.state, disabled: true }),
      date: new FormControl({ value: this.user.date, disabled: true })
    });

  }

  update() {
    this.title = "Update user";

    this.form = new FormGroup({
      id: new FormControl({ value: this.user.id, disabled: true }),
      name: new FormControl(this.user.name, [Validators.required]),
      age: new FormControl(this.user.age, [Validators.required]),
      mail: new FormControl(this.user.mail, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, [Validators.required]),
      description: new FormControl(this.user.description, [Validators.required]),
      state: new FormControl(this.user.state, [Validators.required]),
      date: new FormControl(this.user.date, [Validators.required])
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
      state: new FormControl({ value: this.user.state, disabled: true }),
      date: new FormControl({ value: this.user.date, disabled: true })
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
      this.user.date = this.form.get('date').value;

      //Api 
      this.entityService.save(UserModel.entity, this.user)
        .subscribe(user => { console.log("New user"); this.user = <UserModel>user; this.updateList(true) });

    } else {      
      alert("Invalid form");
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
      this.user.date = this.form.get('date').value;

      //Api 
      this.entityService.update(UserModel.entity, this.user.id, this.user)
        .subscribe(user => { console.log("Update user"); this.user = <UserModel>user; this.updateList(false) });

    } else {
      alert("Invalid form");
    }
  }

  onDelete() {
    //Api
    this.entityService.remove(UserModel.entity, this.user.id)
      .subscribe(user => { this.user = <UserModel>user; console.log("Delete user"); this.updateList(true) });
  }

  //************ FORM VIDATION ************//

  getErrorMessageName() {
    if (this.form.get('name').hasError('required')) {
      return 'Name is required';
    }
    if (this.form.get('name').hasError('minlength')) {
      return 'Minimum length is 5 characters';
    }
  }

  getErrorMessageAge() {
    if (this.form.get('age').hasError('required')) {
      return 'Age is required';
    }
  }

  getErrorMessageMail() {
    if (this.form.get('mail').hasError('required')) {
      return 'Mail is required';
    }
    if (this.form.get('mail').hasError('email')) {
      return 'Invalid email';
    }
  }

  getErrorMessagePassword() {
    if (this.form.get('password').hasError('required')) {
      return 'Password is required';
    }
  }

  getErrorMessageDescription() {
    if (this.form.get('description').hasError('required')) {
      return 'Description is required';
    }
  }

  //************ EVENTS ************//  

  updateList(isUpdate: boolean) {
    if (isUpdate) {
      this.isUpdateList.emit(isUpdate);
    }
    //Hide modal
    this.modal.hide();
    this.form.reset();
  }

}
