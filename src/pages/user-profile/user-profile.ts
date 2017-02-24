import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NativeStorage, TwitterConnect, Facebook } from 'ionic-native';
import { LoginPage } from '../login/login';

/*
  Generated class for the UserProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  user: any;
  userReady: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let env = this;
    env.user = {
      name: '',
      picture: '',
      token: ''
    };

    NativeStorage.getItem('user').then(function(data) {
      env.user = {
        name: data.name,
        picture: data.picture,
        token: data.token
      };
      console.log("userLocal = " + env.user);
      console.log("userLocal2 = " + env.user.name);

      env.userReady = true;
    }, function(error) {
      console.log("Error = " + error);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  ionViewCanEnter() {


  }


  doFbLogout() {
    var nav = this.navCtrl;
    NativeStorage.remove('user');
    nav.setRoot(LoginPage);

  }

}
