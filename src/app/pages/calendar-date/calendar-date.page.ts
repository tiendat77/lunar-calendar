import { Component } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';

import { LunarDate, SolarDate } from 'vietnamese-lunar-calendar';

import { MONTHS, YEARS } from '../../constants/time.constant';
import { WEEKDAYS_MAP, MONTHS_MAP } from '../../constants/mapper.constant';

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

  monthsMap = MONTHS_MAP;
  weekDaysMap = WEEKDAYS_MAP;

  constructor(
    private alert: AlertController
  ) {
    this.selectDate(this.date);
  }

  private selectDate(date: Date) {
    this.lunarDate = new LunarDate(date);
    this.solarDate = new SolarDate(date);
  }

  async selectMonth() {
    const _date = this.date.getDate();
    const _month = this.date.getMonth() + 1;
    const _year = this.date.getFullYear();

    const inputs: AlertInput[] = MONTHS.map(month => {
      month.checked = month.value === _month;
      month.handler = (e) => {
        this.date = new Date(_year, e.value - 1, _date);
        this.selectDate(this.date);

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
    const _date = this.date.getDate();
    const _month = this.date.getMonth() + 1;
    const _year = this.date.getFullYear();

    const inputs: AlertInput[] = YEARS.map(year => {
      year.checked = year.value === _year;
      year.handler = (e) => {
        this.date = new Date(e.value, _month - 1, _date);
        this.selectDate(this.date);

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
