import { Injectable } from '@angular/core';

import { Calendar } from 'vietnamese-lunar-calendar';

@Injectable({providedIn: 'root'})
export class CalendarService {

  constructor() { }

  getCalendar(year: number, month: number): Calendar {
    return new Calendar(year, month);
  }

}
