import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EntityApiModel } from '../models/entity.api.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EntityApiService {

  constructor(private http: HttpClient) { }

  find(entity: string): Observable<EntityApiModel[]> {
    return this.http.get<EntityApiModel[]>(`${environment.api}/${entity}`).pipe(
      map(data => data.map(data => new EntityApiModel().deserialize(data)))
    );
  }

  findById(entity: string, id: string): Observable<EntityApiModel> {
    return this.http.get<EntityApiModel>(`${environment.api}/${entity}/${id}`);
  }

  save(entity: string, entityApi: EntityApiModel): Observable<EntityApiModel> {
    return this.http.post<EntityApiModel>(`${environment.api}/${entity}`, entityApi);
  }

  update(entity: string, id: string, entityApi: EntityApiModel): Observable<EntityApiModel> {
    return this.http.put<EntityApiModel>(`${environment.api}/${entity}/${id}`, entityApi);
  }

  remove(entity: string, id: string): Observable<EntityApiModel> {
    return this.http.delete<EntityApiModel>(`${environment.api}/${entity}/${id}`);
  }

}
