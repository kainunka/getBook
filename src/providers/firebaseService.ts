import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var firebase: any;

@Injectable()
export class FirebaseService {

  constructor() {
    var config = {
      apiKey: "AIzaSyB9iverOh8z6ZeRX5kj1C4faPLHnc1O_R0",
      authDomain: "firstapp-e20a1.firebaseapp.com",
      databaseURL: "https://firstapp-e20a1.firebaseio.com",
      storageBucket: "firstapp-e20a1.appspot.com",
      messagingSenderId: "877097461184"
    };
    firebase.initializeApp(config);
  }
}
