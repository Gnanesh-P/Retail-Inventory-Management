import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  ngOnInit() {

  }

  validateForm = this.fb.group({
    username: [],
    password: [],
    remember: []
  })

  submitForm() { }
}
