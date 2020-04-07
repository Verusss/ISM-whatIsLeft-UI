import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private categoriesArray: string[];
  private photosArray: string[];

  constructor(private http: HttpClient) { }

  getItems(){
    return this.http.get('/server/v1/items');
  }

  getItem(id: number){
    return this.http.get('/server/v1/item/' + id);
  }

  createItemRegistration(item){
    this.categoriesArray = item.categories.split(',', 3);
    console.log(this.categoriesArray);
    item.categories = [];
    // tslint:disable-next-line:only-arrow-functions
    this.categoriesArray.forEach(function(value) {
      item.categories.push(value);
    });
    this.photosArray = item.photoUrls.split(',', 100);
    item.photoUrls = [];
    // tslint:disable-next-line:only-arrow-functions
    this.photosArray.forEach(function(value){
      item.photoUrls.push(value);
    });
    let body = JSON.stringify(item);
    return this.http.post('/server/v1/item', body, httpOptions);
  }
}
