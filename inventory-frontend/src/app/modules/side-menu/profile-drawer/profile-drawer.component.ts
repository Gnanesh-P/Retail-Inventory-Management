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
  selector: 'app-profile-drawer',
  templateUrl: './profile-drawer.component.html',
  styleUrls: ['./profile-drawer.component.scss'],
})
export class ProfileDrawerComponent implements OnInit {
  constructor(private api: ApiService, private fb: FormBuilder, private alert: AlertService) { }
  ngOnInit() {
    this.drawer.emit(this.profileDrawer);
    this.profileDrawer.width = 600;
    this.profileDrawer.title = 'Sujith Vaithilingam Profile';

    this.profileDrawer.events.pipe(filter(x => x == "OPEN")).subscribe(res => {
      this.profileDrawer.title = 'Sujith Vaithilingam Profile';
    })
    this.profileDrawer.events.pipe(filter(x => x == "CLOSE")).subscribe(res => {
      this.profileDrawer.title = 'Sujith Vaithilingam Profile';
    })

  }

  @Output() drawer: EventEmitter<Drawer> = new EventEmitter();
  profileDrawer = new Drawer();
}
