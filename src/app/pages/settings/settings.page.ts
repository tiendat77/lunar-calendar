import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/providers/notify.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private notify: NotifyService) { }

  ngOnInit() {
  }

  schedule() {
    this.notify.push();
  }

}
