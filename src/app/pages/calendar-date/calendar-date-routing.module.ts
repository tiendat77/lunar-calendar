import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarDatePage } from './calendar-date.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarDatePageRoutingModule {}
