import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  local: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    var config = {
      apiKey: "AIzaSyB9iverOh8z6ZeRX5kj1C4faPLHnc1O_R0",
      authDomain: "firstapp-e20a1.firebaseapp.com",
      databaseURL: "https://firstapp-e20a1.firebaseio.com",
      storageBucket: "firstapp-e20a1.appspot.com",
      messagingSenderId: "877097461184"
    };
    firebase.initializeApp(config);

    this.local = new Storage();
    // used for an example of ngFor and navigation

    this.pages = [
      { title: 'Home Page', component: HomePage },
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },
    ];
    this.rootPage = HomePage;

  }

  initializeApp() {
    this.platform.ready().then(() => {




     /*this.local.get('name').then((data) => {
        if (data == null) {
          this.pages = [
            { title: 'Login', component: LoginPage },
          ];

          this.rootPage = LoginPage;
        } else {
          this.pages = [
            { title: 'Home Page', component: HomePage },
            { title: 'Page One', component: Page1 },
            { title: 'Page Two', component: Page2 },
          ];
          this.rootPage = HomePage;
        }
      });*/

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
