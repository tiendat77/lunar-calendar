import { Component } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';
import { Calendar, CalendarDay } from 'vietnamese-lunar-calendar';

import { MONTHS_MAP, WEEKDAYS_MAP } from '../../constants/mapper.constant';
import { MONTHS, YEARS } from '../../constants/time.constant';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.page.html',
  styleUrls: ['./calendar-month.page.scss'],
})
export class CalendarMonthPage {

  year: number;
  month: number;
  calendar: Calendar;

  selected: CalendarDay;

  weekdays = [
    'Hai',
    'Ba',
    'Tư',
    'Năm',
    'Sáu',
    'Bảy',
    'CN',
  ];

  monthsMap = MONTHS_MAP;
  weekdaysMap = WEEKDAYS_MAP;

  constructor(private alert: AlertController) {
    this.init();
  }

  private init() {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    this.calendar = new Calendar(this.year, this.month);

    this.findToday();
  }

  private refresh() {
    if (this.month > 12 || this.month < 1) {
      return;
    }

    this.calendar = new Calendar(this.year, this.month);
  }

  private findToday() {
    // find today in calendar
    this.calendar.weeks.forEach(week => {
      week.forEach(day => {
        if (day.isToday) {
          this.selected = day;
        }
      });
    });
  }

  nextYear() {
    if (this.year > 2100) {
      return;
    }

    this.year += 1;
    this.refresh();
  }

  prevYear() {
    if (this.year < 1900) {
      return;
    }

    this.year -= 1;
    this.refresh();
  }

  nextMonth() {
    if (this.month === 12) {
      this.year += 1;
      this.month = 1;
      return this.refresh();
    }

    this.month += 1;
    this.refresh();
  }

  prevMonth() {
    if (this.month === 1) {
      this.year -= 1;
      this.month = 12;
      return this.refresh();
    }

    this.month -= 1;
    this.refresh();
  }

  isActive(day: CalendarDay) {
    if (!this.selected) {
      return false;
    }

    return this.selected.solar.year === day.solar.year
      && this.selected.solar.month === day.solar.month
      && this.selected.solar.date === day.solar.date;
  }

  selectDate(day: CalendarDay) {
    this.selected = day;

    if (this.selected.solar.month !== this.month) {
      this.month = this.selected.solar.month;
      this.year = this.selected.solar.year;
      this.refresh();
    }
  }

  async selectMonth() {
    const inputs: AlertInput[] = MONTHS.map(month => {
      month.checked = month.value === this.month;
      month.handler = (e) => {
        this.month = e.value;
        this.refresh();
        this.findToday();

        this.alert.dismiss();
      }
      return month;
    });

    const alert = await this.alert.create({
      header: 'Tháng',
      cssClass: 'alert-form',
      mode: 'ios',
      inputs,
    });

    await alert.present();
  }

  async selectYear() {

    const inputs: AlertInput[] = YEARS.map(year => {
      year.checked = year.value === this.year;
      year.handler = (e) => {
        this.year = e.value;
        this.refresh();
        this.findToday();

        this.alert.dismiss();
      }
      return year;
    });

    const alert = await this.alert.create({
      header: 'Năm',
      cssClass: 'alert-form',
      mode: 'ios',
      inputs,
    });

    await alert.present();
  }

}
