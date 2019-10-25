import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductModel } from 'src/app/entity/models/product.model';
import { EntityService } from 'src/app/entity/services/entity.service';
import { ProductCrudComponent } from '../product-crud/product-crud.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'entity-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //Filter
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<ProductModel>;

  //List
  products: ProductModel[];
  product: ProductModel;
  
  //Alert
  alerts: any[];

  constructor(private entityService: EntityService) { }

  ngOnInit() {
    this.displayedColumns = ['#', 'id', 'name', 'read', 'update', 'delete'];
    this.dataSource = new MatTableDataSource<ProductModel>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.alerts = [];
    this.find();
  }

  find() {
    this.entityService.find(ProductModel.entity)
      .subscribe(products => { console.log(products); this.products = <ProductModel[]>products; this.dataSource.data = this.products });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClosedAlert(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  //** */
  @Output() event = new EventEmitter<any>();
  eventEmit(action: string, product: ProductModel) {    
    return this.event.emit({action, product});
  }

}