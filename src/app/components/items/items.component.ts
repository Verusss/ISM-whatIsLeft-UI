import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-item',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  public items;
  public displayItems = [];
  public categoriesData;
  statusData: string[] = [
    'available',
    'sold'
  ];
  form: FormGroup;
  private categoriesString: string;
  private statusChecked = false;
  private bothChecked = false;
  private test: string;
  constructor(private itemService: ItemService, private categoriesService: CategoriesService) { }

  getCategories(){
    this.categoriesService.getCategories().subscribe(
      data => { this.categoriesData = data; },
      err => console.error(err),
      () => console.log('categories loaded')
    );
  }

  ngOnInit(): void {
    this.getCategories();
    this.form = new FormGroup( {
      categories: new FormArray([], Validators.required),
      status: new FormControl([], Validators.required)
    });
    this.getItems();
  }

  getItems(){
    this.itemService.getItems().subscribe(
      data => { this.items = data; },
      err => console.error(err),
      () => console.log('items loaded')
    );
  }

  getItemsByStatus(status: string){
    this.itemService.getItemsByStatus(status).subscribe(
      data => { this.items = data; },
      err => console.error(err),
      () => console.log('items reloaded')
    );
  }

  onCategoriesCheckChange(event) {
    const categoriesArray: FormArray = this.form.get('categories') as FormArray;
    this.categoriesString = '';

    if (event.target.checked){
      categoriesArray.push(new FormControl(event.target.value));
    }
    else {
      let i = 0;
      categoriesArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value){
          categoriesArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    for (let i = 0; i < categoriesArray.length; i++) {
      this.categoriesString += 'categories=';
      this.categoriesString += categoriesArray.at(i).value;
      this.categoriesString += '&';
    }
    if (categoriesArray.length !== 0){
      this.itemService.getItemsByCategory(this.categoriesString).subscribe(
        data => { this.items = data; },
        err => console.error(err),
        () => console.log('items reloaded')
      );
    }
    else {
      this.getItems();
    }
  }

  onStatusCheckChange(event) {
    const statusChanged = event.target.value;
    if (event.target.checked) {
      if (this.statusChecked) {
        this.bothChecked = true;
        this.getItems();
      }
      else {
        this.statusChecked = true;
        this.getItemsByStatus(statusChanged);
      }
    }
    else {
      if (this.bothChecked) {
        this.bothChecked = false;
        if (statusChanged === 'available') {
          this.getItemsByStatus('sold');
        }
        else {
          this.getItemsByStatus('available');
        }
      }
      else {
        this.statusChecked = false;
        this.getItems();
      }
    }
  }
}
