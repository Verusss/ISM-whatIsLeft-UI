import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemform = new FormGroup({
      name: new FormControl('', Validators.required),
      photoUrls: new FormControl('', Validators.required),
      offerType: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      categories: new FormControl('', Validators.required),
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
      this.validMessage = 'Please fill out the form before submitting!';
    }
  }
}
