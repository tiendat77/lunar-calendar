import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tiendathuynh.lunarcalendar',
  appName: 'Âm Lịch Việt',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      iconColor: '#ff0000',
      smallIcon: 'ic_stat_casino',
      sound: 'break_forth.mp3',
    },
  },
};

export default config;
