import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Facebook } from 'ionic-native';

import { HomePage } from '../home/home';

import firebase from 'firebase';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  error: any;
  userProfile: any = null;
  local: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.local = new Storage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  loginFB() {
    Facebook.login(['email']).then((response) => {
      console.log("__response = " + JSON.stringify(response));
      alert("__response = " + JSON.stringify(response));

      const creds = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken)


      console.log("Creads: " + JSON.stringify(creds));

      firebase.auth().signInWithCredential(creds)
        .then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;
            this.local.set('uid', this.userProfile.uid);
            this.local.get('uid').then((data) => {
              console.log("FacebookUID = " + data);
              this.navCtrl.setRoot(HomePage);
              location.reload();
            });
      })
        .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
      });



    }).catch((error) => {
      console.log("Error: " + error);
    });
  }

}
