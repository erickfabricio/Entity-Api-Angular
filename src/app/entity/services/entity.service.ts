import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EntityModel } from '../models/entity.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private http: HttpClient) { }

  find(entity: string): Observable<EntityModel[]> {
    
    return this.http.get<EntityModel[]>(`${environment.api}/${entity}`).pipe(
      map(data => data.map(data => new EntityModel().deserialize(data)))
    );

    //return this.http.get<EntityModel[]>(`${environment.api}/${entity}`);

  }

  findById(entity: string, id: string): Observable<EntityModel> {
    return this.http.get<EntityModel>(`${environment.api}/${entity}/${id}`);
  }

  save(entity: string, entityModel: EntityModel): Observable<EntityModel> {
    return this.http.post<EntityModel>(`${environment.api}/${entity}`, entityModel);
  }

  update(entity: string, id: string, entityModel: EntityModel): Observable<EntityModel> {
    return this.http.put<EntityModel>(`${environment.api}/${entity}/${id}`, entityModel);
  }

  remove(entity: string, id: string): Observable<EntityModel> {
    return this.http.delete<EntityModel>(`${environment.api}/${entity}/${id}`);
  }

}
