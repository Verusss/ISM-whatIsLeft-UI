import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import { ItemService } from '../../services/item.service';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  offerTypes: string[] = [
    'selling',
    'exchanging',
    'giving away'
  ];
  status: string[] = [
    'available',
    'sold'
  ];
  itemform: FormGroup;
  validMessage = '';
  public categories;
  constructor(private itemService: ItemService, private categoriesService: CategoriesService) {
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe(
      data => { this.categories = data; },
      err => console.error(err),
      () => console.log('categories loaded')
    );
  }

  ngOnInit(): void {
    this.getCategories();
    this.itemform = new FormGroup({
      name: new FormControl('', Validators.required),
      photoUrls: new FormControl('', Validators.required),
      offerType: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      categories: new FormArray([], Validators.required),
      status: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });
  }

  submitRegistration(){
    if (this.itemform.valid) {
      this.validMessage = 'Item has been added!';
      this.itemService.createItemRegistration(this.itemform.value).subscribe(
        data => {
          this.itemform.reset();
          return true;
        },
        error => {
          return console.error(error);
        }
      );
    } else {
      this.validMessage = 'Please check if all fields are filled out correctly before submitting!';
    }
  }

  onCheckChange(event) {
    const formArray: FormArray = this.itemform.get('categories') as FormArray;

    if (event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }
    else {
      let i = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value){
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
