import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'core-add-new-label',
  template: `
  <div class="relative w-full">
    <span>{{label}}</span>
    <a class="absolute right-0">
        <div class="flex justify-start items-center mr-1" (click)="onAddNewClicked.emit()">
            <span class="material-symbols-rounded text-sm mr-1">add_circle</span>
            <span>Add New</span>
        </div>
    </a>
  </div>
  `,
  styles: [`
    :host{
      display: block;
      width: 100%;
    }`]
})
export class AddNewLabelComponent {
  @Input() label: string
  @Output() onAddNewClicked: EventEmitter<null> = new EventEmitter();
}
