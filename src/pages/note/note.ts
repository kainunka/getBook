import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the Note page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-note',
  templateUrl: 'note.html'
})
export class NotePage {
  title: string;
  name: string;
  items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.items = angFire.database.list('/undefined/personal');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotePage');

    this.title = this.navParams.get('title');
    this.name = this.navParams.get('name');
  }

}
