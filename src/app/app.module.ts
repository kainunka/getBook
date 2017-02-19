import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home';
import { NotePage } from '../pages/note/note';
import { LoginPage } from '../pages/login/login';
import { PopOverPage } from '../pages/pop-over/pop-over';

import { AngularFireModule } from 'angularfire2';


export const firebaseConfig = {
  apiKey: "AIzaSyB9iverOh8z6ZeRX5kj1C4faPLHnc1O_R0",
  authDomain: "firstapp-e20a1.firebaseapp.com",
  databaseURL: "https://firstapp-e20a1.firebaseio.com",
  storageBucket: "firstapp-e20a1.appspot.com",
  messagingSenderId: "877097461184"
}

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    NotePage,
    LoginPage,
    PopOverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    NotePage,
    LoginPage,
    PopOverPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
