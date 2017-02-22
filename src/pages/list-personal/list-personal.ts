import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ListPersonal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-personal',
  templateUrl: 'list-personal.html'
})
export class ListPersonalPage {

  person: FirebaseListObservable<any>;
  local: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {

    this.local = new Storage();

    this.local.get('name').then((data) => {
      this.person = angFire.database.list('/' + data + '/personal');
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPersonalPage');
  }

}
