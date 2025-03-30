import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'core-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() loading: boolean = false
  @Input() isDisabled: boolean = false
  @Input() iconName!: string
  @Input() isActive: boolean = false;

  __isLoading = false;
  isDefaultTimeFinished = false;
  ngOnInit() { }
  ngOnChanges() {
    if (this.loading) {
      this.__isLoading = true
      this.isDefaultTimeFinished = false;
    } else {
      setTimeout(() => {
        this.isDefaultTimeFinished = true
        this.__isLoading = this.loading;
      }, 600);
      if (this.isDefaultTimeFinished) {
        this.__isLoading = this.loading;
      }
    }
  }
}
