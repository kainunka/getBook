import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Facebook } from 'ionic-native';
import {  AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage {
  error: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFire: AngularFire) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  registerUserWithFacebook() {
    this.angFire.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then((value) => {
      this.navCtrl.setRoot(HomePage);
      console.log("value = " + JSON.stringify(value));
    }).catch((error) => {
      this.error = error;
    });
  }


  /*loginFB():void {
    Facebook.login(['email']).then((response) => {
      console.log("__response = " + response);

      let creds = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken)

      let providerConfig = {
        provider: AuthProviders.Facebook,
        method: AuthMethods.OAuthToken,
        remember: 'default',
        scope: ['email'],
      };


      this.angFire.auth.login(creds, providerConfig).then((success) => {
        console.log("Firebase Success: " + JSON.stringify(success));
        alert("Firebase Success: " + JSON.stringify(success));
      }).catch((error) => {
        console.log("Firebase failure: " + JSON.stringify(error));
        alert("Firebase Success: " + JSON.stringify(error));
      });



    }).catch((error) => {
      console.log(error);
    });
  }*/

}
