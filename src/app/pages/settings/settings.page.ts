import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/providers/notify.service';
import { LunarDate, SolarDate } from 'vietnamese-lunar-calendar';

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
    const date = new Date();
    this.notify.test(new SolarDate(date), new LunarDate(date));
  }

}
