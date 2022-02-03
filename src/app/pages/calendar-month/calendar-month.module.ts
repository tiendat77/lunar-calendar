import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { CalendarMonthPage } from './calendar-month.page';
import { CalendarMonthPageRoutingModule } from './calendar-month-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    CalendarMonthPageRoutingModule
  ],
  declarations: [CalendarMonthPage]
})
export class CalendarMonthPageModule {}
