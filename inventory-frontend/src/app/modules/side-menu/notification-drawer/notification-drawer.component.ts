import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Drawer } from 'projects/inventory-core/src/lib/drawer';
import { Brand } from 'projects/inventory-core/src/lib/inventory-models';
import { hasValues, markAsDirty } from 'projects/inventory-core/src/lib/models';
import { filter } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-notification-drawer',
  templateUrl: './notification-drawer.component.html',
  styleUrls: ['./notification-drawer.component.scss'],
})
export class NotificationDrawerComponent implements OnInit {
  constructor(private api: ApiService, private fb: FormBuilder, private alert: AlertService) { }
  ngOnInit() {
    this.drawer.emit(this.notificationDrawer);
    this.notificationDrawer.width = 600;
    this.notificationDrawer.title = 'Notifications';
    this.notificationDrawer.data = 10

    this.notificationDrawer.events.pipe(filter(x => x == "OPEN")).subscribe(res => {
      this.notificationDrawer.title = 'Notifications';
      this.notificationDrawer.data = 10
    })
    this.notificationDrawer.events.pipe(filter(x => x == "CLOSE")).subscribe(res => {
      this.notificationDrawer.title = 'Notifications';
      this.notificationDrawer.data = 10
    })
    this.notifications = [
      { title: 'Barand Created', description: 'New Brand "Good Times" has been created successfully. Also we have dispatched ' },
      { title: 'Dashbaord Viewed', description: 'New Brand "Good Times" has been created successfully. Also we have dispatched ' },
      { title: 'Sales Has been High', description: 'New Brand "Good Times" has been created successfully. Also we have dispatched,New Brand "Good Times" has been created successfully. ' },
      { title: 'Testing Notification', description: 'New Brand "Good Times" has been created successfully. Also we have dispatched ' },
      { title: 'New Prodcut has been added', description: 'New Brand "Good Times" has been created successfully. New Brand "Good Times" has been created successfully. New Brand "Good Times" has been created successfully., Also we have dispatched ' },
    ];
  }

  notifications: { title: string, description: string }[] = [];
  @Output() drawer: EventEmitter<Drawer> = new EventEmitter();
  notificationDrawer = new Drawer();
}
