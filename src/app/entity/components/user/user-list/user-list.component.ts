import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserModel } from 'src/app/entity/models/user.model';
import { EntityService } from 'src/app/entity/services/entity.service';
import { UserCrudComponent } from '../user-crud/user-crud.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'entity-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  //Filter
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<UserModel>;

  //List
  users: UserModel[];

  //CRUD
  modal: BsModalRef;
  user: UserModel;

  //Alert
  alerts: any[];

  constructor(private entityService: EntityService, private modalService: BsModalService) { }

  ngOnInit() {            
    this.displayedColumns = ['#', 'id', 'name', 'age', 'mail', 'password', 'description', 'state', 'date', 'read', 'update', 'delete'];
    this.dataSource = new MatTableDataSource<UserModel>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.find();
    this.alerts = [];
  }

  find() {
    this.entityService.find(UserModel.entity)
      .subscribe(users => { console.log(users); this.users = <UserModel[]>users; this.dataSource.data = this.users });
  }

  showModalCrud(action: string, user: UserModel) {

    //Show the modal according to the action
    this.modal = this.modalService.show(UserCrudComponent, {
      initialState: {
        action: action,
        user: user
      }
    });

    //Get the modal process
    this.modal.content.isUpdateList.pipe().subscribe(isUpdate => {
      if (isUpdate) {

        //Update List
        this.find();

        //Show Alert
        switch (action) {
          case "CREATE":            
            this.alerts.push({
              type: 'success',
              msg: `New user: ${this.modal.content.user.id}`,
              timeout: 5000
            });

            break;
          case "UPDATE": // Aqui no se llega por el Emitter
            console.log("aqui");
            this.alerts.push({
              type: 'warning',
              msg: `Update user: ${this.modal.content.user.id}`,
              timeout: 5000
            });
            break;
          case "DELETE":
            this.alerts.push({
              type: 'danger',
              msg: `Delete user: ${this.modal.content.user.id}`,
              timeout: 5000
            });
            break;
        }

      }
    });

  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClosedAlert(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

}
