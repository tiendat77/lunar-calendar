import { Injectable } from '@angular/core';

import { LocalNotifications } from '@capacitor/local-notifications';
import { random } from 'lodash';

@Injectable({providedIn: 'root'})
export class NotifyService {

  constructor() { }

  async push() {
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Âm lịch Việt',
          body: 'Hôm nay là ngày: ',
          id: new Date().getDate(),
          // schedule: {
          //   at,
          // },
        },
      ],
    });
  }

}