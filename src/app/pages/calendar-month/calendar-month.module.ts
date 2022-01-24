import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarMonthPageRoutingModule } from './calendar-month-routing.module';

import { CalendarMonthPage } from './calendar-month.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarMonthPageRoutingModule
  ],
  declarations: [CalendarMonthPage]
})
export class CalendarMonthPageModule {}
