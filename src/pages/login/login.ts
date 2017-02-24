import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

import { Facebook, GooglePlus, TwitterConnect, NativeStorage } from 'ionic-native';

import { HomePage } from '../home/home';
import { UserProfilePage } from '../user-profile/user-profile';
import { AuthProviders, AuthMethods, AngularFire } from "angularfire2";

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  error: any;
  userProfile: any = null;
  local: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public loadingCtrl: LoadingController) {
      this.local = new Storage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  /*registerUserWithFacebook() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then((value) => {
      console.log(JSON.stringify(value));
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      this.error = error;
    });
  }*/


  loginFB() {


    let permissions = new Array();
    let nav = this.navCtrl;
    permissions = ["public_profile"];

    Facebook.login(permissions).then(function(response) {
      let userId = response.authResponse.userID;
      let params = new Array();

      Facebook.api("/me?fields=name,gender", params).then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";

        console.log("FacebookUser = " + JSON.stringify(user));
        console.log("FacebookAccessToken = " + response.authResponse.accessToken);

        NativeStorage.setItem('user', {
          name: user.name,
          picture: user.picture,
          token: response.authResponse.accessToken
        }).then(function() {
          nav.setRoot(HomePage);
        }, function(error) {
          console.log('ErrorNativeStorage = ' + error);
        })
      })
    }, function(error) {
        console.log("Facebook Login = " + error);
    });


    //Facebook.login(['email']).then((response) => {
      //console.log("facebookLoginSuccess = " + JSON.stringify(response));

      //const creds = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken)


      //console.log("Creads: " + JSON.stringify(creds));

      /*firebase.auth().signInWithCredential(creds)
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
      });*/



    //}).catch((error) => {
    //  console.log("Error: " + error);
  //  });
  }



  loginGoogle() {

    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    GooglePlus.login({
      'scopes': 'email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
      }).then((response) => {
      loading.dismiss();


      console.log("UserGoogle = " + response);
      alert(response);
      /*NativeStorage.setItem('user', {
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      })
      .then(function(res){
        alert(res);
      }, function (error) {
        console.log(error);
      })*/
    }, (error) => {
      loading.dismiss();

      console.log("ErrorGoogle = " + error);
    });
  }


  loginTwitter() {
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    //Request for login
    TwitterConnect.login().then(function(result) {
      //Get user data
      console.log("TwitterLog = " + result);
      console.log("TwitterLog2 = " + JSON.stringify(result));

      TwitterConnect.showUser().then(function(user){
        //Save the user data in NativeStorage
        console.log("SuccessLogin + " + JSON.stringify(user));
        loading.dismiss();
        NativeStorage.setItem('user', {
          name: user.name,
          picture: user.profile_image_url_https,
          token: result.token
        }).then(function() {

          nav.setRoot(HomePage);
        });

      }, function(error){
        console.log("ErrorTwitterLogin = " + error);
        loading.dismiss();
      });
    });
  }

}
