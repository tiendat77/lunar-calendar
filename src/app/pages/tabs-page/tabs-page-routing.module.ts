import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs-page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'date',
        loadChildren: () => import('../calendar-date/calendar-date.module').then( m => m.CalendarDatePageModule)
      },
      {
        path: 'month',
        loadChildren: () => import('../calendar-month/calendar-month.module').then( m => m.CalendarMonthPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/app/tabs/date',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

