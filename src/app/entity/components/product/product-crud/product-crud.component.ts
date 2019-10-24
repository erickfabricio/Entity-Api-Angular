import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EntityService } from 'src/app/entity/services/entity.service';
import { ProductModel } from 'src/app/entity/models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'entity-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {
  
  //CRUD
  action: string;
  id: string;  
  product: ProductModel;
  
  //Form
  title: string;
  form: FormGroup;
  visibleControls;
  
  constructor(private router: ActivatedRoute, private entityService: EntityService) { }
  
  ngOnInit() {

    this.id = this.router.snapshot.params.id;
    this.action = this.router.snapshot.params.action;

    console.log(this.action + "->" + this.id);
    this.findProductById();

    //Default
    this.visibleControls = {
      id: true,
      name: true
    };

    //Action
    switch (this.action) {
      case "create":
        this.create();
        break;
      case "read":
        this.read();
        break;
      case "update":
        this.update();
        break;
      case "delete":
        this.delete();
        break;
    }

  }

  findProductById() {
    this.entityService.findById(ProductModel.entity, this.id)
    .subscribe(product => { console.log(product); this.product = <ProductModel>product; });
  }

  //************ FORM ************//

  create() {
    this.title = "Create product";

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    this.visibleControls.id = false;
    this.visibleControls.date = false;
  }

  read() {
    this.title = "Read product";

    this.form = new FormGroup({
      id: new FormControl({ value: this.product.id, disabled: true }),
      name: new FormControl({ value: this.product.name, disabled: true })
    });

  }

  update() {
    this.title = "Update product";

    this.form = new FormGroup({
      id: new FormControl({ value: this.product.id, disabled: true }),
      name: new FormControl(this.product.name, [Validators.required])
    });

  }

  delete() {
    this.title = "Delete product";

    this.form = new FormGroup({
      id: new FormControl({ value: this.product.id, disabled: true }),
      name: new FormControl({ value: this.product.name, disabled: true })
    });

  }

  //************ ACTIONS ************//

  onCreate() {
    if (this.form.valid) {
      console.log("Valid");

      //Assignment of values
      this.product = new ProductModel();
      //this.product.id = String(this.form.get('id').value).trim();      
      this.product.name = String(this.form.get('name').value).trim();      

      //Api 
      this.entityService.save(ProductModel.entity, this.product)
        .subscribe(product => { console.log("New product"); this.product = <ProductModel>product });

    } else {      
      alert("Invalid form");
    }
  }

  onUpdate() {
    if (this.form.valid) {
      console.log("Valid");

      //Assignment of values      
      //this.product.id = String(this.form.get('id').value).trim();      
      this.product.name = String(this.form.get('name').value).trim();

      //Api 
      this.entityService.update(ProductModel.entity, this.product.id, this.product)
        .subscribe(product => { console.log("Update product"); this.product = <ProductModel>product });

    } else {
      alert("Invalid form");
    }
  }

  onDelete() {
    //Api
    this.entityService.remove(ProductModel.entity, this.product.id)
      .subscribe(product => { this.product = <ProductModel>product; console.log("Delete product") });
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

}
