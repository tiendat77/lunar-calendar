import { Injectable } from '@angular/core';

import { Calendar, CalendarDay } from 'vietnamese-lunar-calendar';
import { NotifyService } from './notify.service';

@Injectable({providedIn: 'root'})
export class CalendarService {

  constructor(
    private notify: NotifyService,
  ) { }

  remindVegetarianDays() {
    const today = new Date();
    const calendar = new Calendar(today.getFullYear(), today.getMonth() + 1);
    const vegDays: CalendarDay[] = [];

    calendar.weeks.forEach(week => {
      week.forEach(day => {
        if (day.lunar.isVegetarianDay) {
          vegDays.push(day);
        }
      });
    });

    vegDays.forEach(day => {
      this.notify.schedule(day.solar, day.lunar);
    });
  }

}
