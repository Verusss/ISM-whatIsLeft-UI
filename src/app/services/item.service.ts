import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems(){
    return this.http.get('/server/v1/items');
  }

  getItem(id: number){
    return this.http.get('/server/v1/item/' + id);
  }

  createItemRegistration(item){
    let body = JSON.stringify(item);
    return this.http.post('/server/v1/item', body, httpOptions);
  }
}
