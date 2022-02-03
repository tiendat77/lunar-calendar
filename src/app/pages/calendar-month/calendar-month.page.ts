import { Component, NgZone, ViewChild } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
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
  calendars: Calendar[] = [];

  selected: CalendarDay;
  activeIndex: number = 0;

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

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  constructor(
    private alert: AlertController,
    private ngZone: NgZone,
  ) {
    const today = new Date();

    this.month = today.getMonth() + 1;
    this.year = today.getFullYear();

    this.init();
  }

  private init(year = this.year, month = this.month) {
    const calendars: Calendar[] = [];

    for (let i = - 2; i <= 2; i++) {
      calendars.push(this.getCalendar(year, month + i));
    }

    let today;
    calendars[2].weeks.forEach(week => {
      week.forEach(day => {
        if (day.isToday) {
          today = day;
        }
      });
    });

    const sorted = [];
    sorted[this.activeIndex] = calendars[2];
    sorted[(this.activeIndex + 1) % 5] = calendars[3];
    sorted[(this.activeIndex + 2) % 5] = calendars[4];
    sorted[(this.activeIndex + 3) % 5] = calendars[0];
    sorted[(this.activeIndex + 4) % 5] = calendars[1];

    this.ngZone.run(() => {
      this.calendars = sorted;
      this.selected = today ? today : this.selected;
      this.swiper?.swiperRef?.update();
    });
  }

  private getCalendar(year: number, month: number) {
    if (month < 1) {
      month = 12 + month;
      year = year - 1;
    }

    if (month > 12) {
      month = month - 12;
      year = year + 1;
    }

    return new Calendar(year, month);
  }

  nextYear() {
    if (this.year > 2100) {
      return;
    }

    this.year += 1;
    this.init();
  }

  prevYear() {
    if (this.year < 1900) {
      return;
    }

    this.year -= 1;
    this.init();
  }

  nextMonth() {
    this.swiper?.swiperRef.slideNext();
    this.slided();
  }

  prevMonth() {
    this.swiper?.swiperRef.slidePrev();
    this.slided();
  }

  trackByIndex(index: number, item: any) {
    return index;
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
  }

  async selectMonth() {
    const inputs: AlertInput[] = MONTHS.map(month => {
      month.checked = month.value === this.month;
      month.handler = (e) => {
        this.month = e.value;
        this.init();

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
        this.init();

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

  slided() {
    const nextIndex = (this.activeIndex + 2) % 5;
    const prevIndex = (this.activeIndex - 2) >= 0 ? (this.activeIndex - 2) : 5 + (this.activeIndex - 2);

    const activeYear = this.calendars[this.activeIndex].year;
    const activeMonth = this.calendars[this.activeIndex].month;

    this.ngZone.run(() => {
      this.year = activeYear;
      this.month = activeMonth;

      this.calendars[nextIndex] = this.getCalendar(this.year, this.month + 2);
      this.calendars[prevIndex] = this.getCalendar(this.year, this.month - 2);
    });
  }

  onSlideChange(event) {
    this.activeIndex = event.realIndex;

    if (
      event?.swipeDirection === 'next' ||
      event?.swipeDirection === 'prev'
    ) {
      this.slided();
    }
  }

}
