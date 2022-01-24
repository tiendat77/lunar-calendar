import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarMonthPage } from './calendar-month.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarMonthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarMonthPageRoutingModule {}
