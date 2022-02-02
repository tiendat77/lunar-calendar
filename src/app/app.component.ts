import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

/* Ionic */
import {
  AlertController,
  MenuController,
  ModalController,
  Platform,
  ToastController
} from '@ionic/angular';

/* Natives */
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

/* Services */
import { UserData } from './providers/user-data';
import { NotifyService } from './providers/notify.service';
import { StorageService } from './providers/storage.service';
import { CalendarService } from './providers/calendar.service';

import { APP_TABS } from './constants/app-tabs.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  dark = false;
  loggedIn = false;
  appPages = APP_TABS;

  constructor(
    private router: Router,
    private platform: Platform,

    private swUpdate: SwUpdate,
    private menu: MenuController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,

    private userData: UserData,
    private calendar: CalendarService,
    private notify: NotifyService,
    private storage: StorageService,
  ) {
    this.platform.ready().then(() => {
      this.initializeApp();
    });
  }

  async ngOnInit() {
    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  async initializeApp() {
    StatusBar.setBackgroundColor({color: '#f4f6f6'});
    StatusBar.setStyle({style: Style.Light});
    SplashScreen.hide();

    await this.storage.init();
    this.calendar.remindVegetarianDays();

    this.checkLoginStatus();
    this.listenForLoginEvents();
    this.fuckIonic();
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/date');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  private fuckIonic() {
    window.addEventListener('ionAlertDidPresent', e => {
      const selected = (e.target as HTMLElement).querySelector('[aria-checked="true"]');
      selected && selected.scrollIntoView();
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      this.exit();
    });

    App.addListener('backButton', () => {
      this.modalCtrl.dismiss();
    });
  }

  private async exit() {
    const alert = await this.alertCtrl.create({
      header: 'Thoát ứng dụng?',
      mode: 'ios',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel'
        },
        {
          text: 'Đồng ý',
          handler: () => {
            App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

}
