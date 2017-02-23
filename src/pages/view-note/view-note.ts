import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ViewNote page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html'
})
export class ViewNotePage {
  local: any;
  note: FirebaseListObservable<any>;
  favourite: FirebaseListObservable<any>;
  keyItem: any;
  keyParam: any;
  jsonEnc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {

    this.keyItem = navParams.get('key');
    this.keyParam = navParams.get('keyParam');
    this.local = new Storage();

    console.log(this.keyItem);
    console.log(this.keyParam);

    this.local.get('name').then((data) => {
      this.note = angFire.database.list('/' + data + '/note/' + this.keyItem);
      this.favourite = angFire.database.list('/' + data + '/favourite/' + this.keyItem);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewNotePage');
  }

}
