import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Storage } from '@ionic/storage';
/*
  Generated class for the ViewAll page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-all',
  templateUrl: 'view-all.html'
})
export class ViewAllPage {

  items: FirebaseListObservable<any>;
  local: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.local = new Storage();

    this.local.get('name').then((data) => {
      this.items = angFire.database.list('/' + data + '/personal').map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAllPage');
  }

}
