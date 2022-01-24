import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarDatePageRoutingModule } from './calendar-date-routing.module';

import { CalendarDatePage } from './calendar-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarDatePageRoutingModule
  ],
  declarations: [CalendarDatePage]
})
export class CalendarDatePageModule {}
