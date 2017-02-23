import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { FavouritePage } from '../favourite/favourite';
import { Storage } from '@ionic/storage';
import { ViewNotePage } from '../view-note/view-note';
import { LocationPage } from '../location/location';


@Component({
  selector: 'page-note',
  templateUrl: 'note.html'
})
export class NotePage {

  note: FirebaseListObservable<any>;
  favourite: FirebaseListObservable<any>;
  location: FirebaseListObservable<any>;
  myDate: String = new Date().toISOString();
  local: any;

  keyItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire, public alertCtrl: AlertController, public toastCtrl: ToastController) {

    this.keyItem = navParams.get('key');
    this.local = new Storage();

    console.log(this.keyItem);

    this.local.get('name').then((data) => {
      this.note = angFire.database.list('/' + data + '/note/' + this.keyItem).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
      this.favourite = angFire.database.list('/' + data + '/favourite/' + this.keyItem).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
      this.location = angFire.database.list('/' + data + '/location/' + this.keyItem).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotePage');
  }



  getViewNote(key, keyParam) {
    this.navCtrl.push(ViewNotePage, {
      key: key,
      keyParam: keyParam

    });
  }


  addNote() {
    let prompt = this.alertCtrl.create({
      title: 'Add Note',
      message: 'เพิ่ม Note ของเพื่อน',
      inputs: [
        {
          name: 'title',
          placeholder: 'title'
        },
        {
          name: 'description',
          placeholder: 'description'
        }
      ],
      buttons: [
        {
          text: "Canncel",
          handler: data => {
            console.log("Canncel");
          }
        },
        {
          text: "Save List",
          handler: data => {
            this.note.push({
              title: data.title,
              description: data.description,
              time: this.myDate
            }).then((res) => {
                let toast = this.toastCtrl.create({
                  message: 'Success...',
                  duration: 3000
                });
                toast.present();
            });
          }
        }
      ]
    });

    prompt.present();
  }


  editNote(item) {
    let prompt = this.alertCtrl.create({
      title: 'Edit Note',
      message: 'Update Note',
      inputs: [
        {
          name: 'title',
          placeholder: item.title
        },
        {
          name: 'description',
          placeholder: item.description
        }

      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel");
          }
        },
        {
          text: "Save Item",
          handler: data => {

            let newTitle = item.title;
            let newDescription = item.description;

            if (data.title != '') {
              newTitle = data.title;
            }
            if (data.description != '') {
              newDescription = data.description;
            }

            this.note.update(item.$key, {
              title: newTitle,
              description: newDescription,
              time: item.time
            }).then((res) => {
              let toast = this.toastCtrl.create({
                message: 'Success...',
                duration: 3000
              });
              toast.present();
            });
          }
        }
      ]
    });
    prompt.present();
  }



  deleteNote(itemID) {
    let prompt = this.alertCtrl.create({
      title: 'Delete Item',
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel");
          }
        },
        {
          text: "Delete Items",
          handler: data => {
            this.note.remove(itemID).then((res) => {
              let toast = this.toastCtrl.create({
                message: 'Success...',
                duration: 3000
              });
              toast.present();
            });
          }
        }
      ]
    });
    prompt.present();
  }



  addFav(key) {
    console.log(key);

    this.navCtrl.push(FavouritePage, {
      key: key
    });
  }

  addLocation(key) {
    this.navCtrl.push(LocationPage, {
      key: key
    });
  }


  deleteFav(itemID) {
    let prompt = this.alertCtrl.create({
      title: 'Delete Item',
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel");
          }
        },
        {
          text: "Delete Items",
          handler: data => {
            this.favourite.remove(itemID).then((res) => {
              let toast = this.toastCtrl.create({
                message: 'Success...',
                duration: 3000
              });
              toast.present();
            });
          }
        }
      ]
    });
    prompt.present();
  }


}
