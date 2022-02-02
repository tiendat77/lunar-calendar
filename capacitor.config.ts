import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tiendathuynh.lunarcalendar',
  appName: 'Âm Lịch Việt',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_buddha'
    },
  },
};

export default config;
