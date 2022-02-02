import { AfterViewInit, Component, NgZone, ViewChild } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';

import { SwiperComponent } from 'swiper/angular';
import { LunarDate, SolarDate } from 'vietnamese-lunar-calendar';

import { MONTHS, YEARS } from '../../constants/time.constant';
import { WEEKDAYS_MAP, MONTHS_MAP } from '../../constants/mapper.constant';

@Component({
  selector: 'app-calendar-date',
  templateUrl: './calendar-date.page.html',
  styleUrls: ['./calendar-date.page.scss'],
})
export class CalendarDatePage implements AfterViewInit {

  days: {
    lunarDate: LunarDate,
    solarDate: SolarDate,
  }[] = [];

  activeIndex: number = 0;
  date: Date = new Date();

  quote: string;
  color: string;

  monthsMap = MONTHS_MAP;
  weekDaysMap = WEEKDAYS_MAP;

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  constructor(
    private alert: AlertController,
    private ngZone: NgZone,
  ) {
    this.init();
  }

  ngAfterViewInit() {
    this.swiper?.swiperRef.slideTo(3);
  }

  private init(date: Date = new Date()) {
    const dates = [];

    const i = new Date(date.getTime());
    i.setDate(i.getDate() - 2);

    for (let j = 0; j < 5; j++) {
      dates.push(this.getSolarLunarDate(new Date(i.getTime())));
      i.setDate(i.getDate() + 1);
    }

    this.ngZone.run(() => {
      this.days = dates;
      this.swiper?.swiperRef.slideTo(3);
    });
  }

  private getSolarLunarDate(date: Date) {
    return {
      lunarDate: new LunarDate(date),
      solarDate: new SolarDate(date),
    };
  }

  async selectMonth() {
    const _date = this.date.getDate();
    const _month = this.date.getMonth() + 1;
    const _year = this.date.getFullYear();

    const inputs: AlertInput[] = MONTHS.map(month => {
      month.checked = month.value === _month;
      month.handler = (e) => {
        this.date = new Date(_year, e.value - 1, _date);
        this.init(this.date);

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
        this.init(this.date);

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

  trackByIndex(index: number, item: any) {
    return index;
  }

  nextDay() {
    this.swiper?.swiperRef.slideNext();
    this.slided();
  }

  prevDay() {
    this.swiper?.swiperRef.slidePrev();
    this.slided();
  }

  today() {
    this.date = new Date();
    this.init(this.date);
    this.swiper?.swiperRef.slideTo(3);
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

  slided() {
    const nextIndex = (this.activeIndex + 2) % 5;
    const prevIndex = (this.activeIndex - 2) >= 0 ? (this.activeIndex - 2) : 5 + (this.activeIndex - 2);

    const activeSolarDate = this.days[this.activeIndex].solarDate;
    const activeJsDate = new Date(activeSolarDate.year, activeSolarDate.month - 1, activeSolarDate.date);

    const nextJsDate = new Date(activeJsDate.getTime());
    nextJsDate.setDate(nextJsDate.getDate() + 2);

    const prevJsDate = new Date(activeJsDate.getTime());
    prevJsDate.setDate(prevJsDate.getDate() - 2);

    this.ngZone.run(() => {
      this.date = new Date(activeJsDate.getTime());
      this.days[nextIndex] = this.getSolarLunarDate(nextJsDate);
      this.days[prevIndex] = this.getSolarLunarDate(prevJsDate);
    });
  }

}
