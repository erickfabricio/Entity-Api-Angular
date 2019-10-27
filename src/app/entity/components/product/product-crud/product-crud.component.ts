import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityService } from 'src/app/entity/services/entity.service';
import { ProductModel } from 'src/app/entity/models/product.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'entity-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  //CRUD
  action: string;
  product: ProductModel;

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  constructor(private entityService: EntityService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.title = "CRUD";
    this.visibleControls = {
      id: true,
      name: true
    }
    this.createForm();    
  }

  createForm(){    
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      name: new FormControl('', [Validators.required, Validators.minLength(5)])
    });    
  }

  show() {
    //Action
    switch (this.action) {
      case "CREATE":
        this.create();
        break;
      case "CRUD":
        this.crud();
        break;      
    }
  }

  //************ FORM ************//

  create() {
    this.title = "Create product";
    this.visibleControls.id = false;
    this.form.reset();
    this.product = null;
  }

  crud() {
    this.title = "CRUD product";    
    this.form.get('id').setValue(this.product.id);
    this.form.get('name').setValue(this.product.name);    
    this.visibleControls = {
      id: true,
      name: true
    }
  }

  //************ ACTIONS OF FORM ************//

  onCreate() {    
    if (this.form.valid) {
      //Assignment of values
      this.product = new ProductModel();
      //this.product.id = String(this.form.get('id').value).trim();      
      this.product.name = String(this.form.get('name').value).trim();

      //Api 
      this.entityService.save(ProductModel.entity, this.product)
        .subscribe(product => { console.log("New product"); this.product = <ProductModel>product; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New product: " + this.product.name;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
      this.createForm();      
    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }
  }

  onUpdate() {    
    //Check if there were changes    
    if (this.form.valid) {      
      //Assignment of values      
      //this.product.id = String(this.form.get('id').value).trim();      
      this.product.name = String(this.form.get('name').value).trim();

      //Api 
      this.entityService.update(ProductModel.entity, this.product.id, this.product)
        .subscribe(product => { console.log("Update product"); this.product = <ProductModel>product });

      //Succes
      let succesMessage = "Update product: " + this.product.name;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }
  }

  onDelete() {
    this.action = "DELETE";
    //Api
    this.entityService.remove(ProductModel.entity, this.product.id)
      .subscribe(product => { this.product = <ProductModel>product; console.log("Delete product"); console.log(this.product); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete product: " + this.product.name;
    this.openSnackBar(succesMessage, "X", "snackbar-success");
  }

  //************ FORM VIDATION ************//

  validateForm() {
    return this.getErrorMessageName();
  }

  getErrorMessageName() {
    if (this.form.get('name').hasError('required')) {
      return 'Name is required';
    }
    if (this.form.get('name').hasError('minlength')) {
      return 'Minimum length is 5 characters';
    }
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(
      message,
      action,
      {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: [style]
      }
    );
  }

  //************ EVENTS ************//
  //Process
  @Output() eventUpdateList = new EventEmitter<boolean>();
  eventUpdateListEmitter(isUpdate: boolean) {
    if (isUpdate) {
      this.eventUpdateList.emit(isUpdate);
    }
  }

}
