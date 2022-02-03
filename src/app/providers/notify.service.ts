import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { LunarDate, SolarDate } from 'vietnamese-lunar-calendar';
import { MONTHS_MAP } from '../constants/mapper.constant';

@Injectable({providedIn: 'root'})
export class NotifyService {

  constructor() { }

  async push() {
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Âm lịch Việt',
          body: 'Ding dong',
          id: new Date().getDate(),
        },
      ],
    });
  }

  async schedule(solarDate: SolarDate, lunarDate: LunarDate,) {
    const message = `Hôm nay là ngày ${lunarDate.date} tháng ${MONTHS_MAP[lunarDate.month]}\nHãy nhớ ăn chay bạn nhé! („• ֊ •„)`;
    const date = new Date(solarDate.year, solarDate.month - 1, solarDate.date);
    date.setHours(6); // 6:00 AM

    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Ngày ăn chay',
          body: message,
          id: date.getDate(),
          schedule: {
            at: date,
          },
        },
      ],
    });
  }

  test(solarDate: SolarDate, lunarDate: LunarDate,) {
    const message = `Hôm nay là ngày ${lunarDate.date} tháng ${MONTHS_MAP[lunarDate.month]}\nHãy nhớ ăn chay bạn nhé! („• ֊ •„)`;
    const date = new Date(solarDate.year, solarDate.month - 1, solarDate.date);

    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Ngày ăn chay',
          body: message,
          id: date.getDate(),
        },
      ],
    });
  }

}