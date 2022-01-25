import { Component } from '@angular/core';
import { LunarDate, SolarDate } from 'vietnamese-lunar-calendar';

@Component({
  selector: 'app-calendar-date',
  templateUrl: './calendar-date.page.html',
  styleUrls: ['./calendar-date.page.scss'],
})
export class CalendarDatePage {

  lunarDate: LunarDate;
  solarDate: SolarDate;
  date: Date = new Date();

  quote: string;
  color: string;

  constructor() {
    this.selectDate(this.date);
  }

  private selectDate(date: Date) {
    this.lunarDate = new LunarDate(date);
    this.solarDate = new SolarDate(date);
  }

  selectMonth() {
  }

  selectYear() {
  }

  nextDate() {
    this.date.setDate(this.date.getDate() + 1);
    this.selectDate(this.date);
  }

  prevDate() {
    this.date.setDate(this.date.getDate() - 1);
    this.selectDate(this.date);
  }

  today() {
    this.date = new Date();
    this.selectDate(this.date);
  }

}
