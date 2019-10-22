import { Component, OnInit } from '@angular/core';
import { EntityService } from '../../services/entity.service';
import { EntityModel } from '../../models/entity.model';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  entity: string = "users";
  descriptions: string[] = ["id", "name"]

  //List
  entities: EntityModel[];

  constructor(private entityService: EntityService) { }

  ngOnInit() {
    this.find();
  }

  find() {
    this.entityService.find(this.entity)
      .subscribe(entities => {console.log(entities); this.entities = entities });
  }

}
