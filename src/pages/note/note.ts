import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { PopOverPage } from '../pop-over/pop-over';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-note',
  templateUrl: 'note.html'
})
export class NotePage {

  title: string;
  name: string;
  note: FirebaseListObservable<any>;
  favourite: FirebaseListObservable<any>;
  location: FirebaseListObservable<any>;
  myDate: String = new Date().toISOString();

  keyItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {

    this.keyItem = navParams.get('key');

    console.log(this.keyItem);

    this.note = angFire.database.list('/undefined/note/' + this.keyItem);

    this.favourite = angFire.database.list('/undefined/favourite/' + this.keyItem);

    this.location = angFire.database.list('/undefined/location/' + this.keyItem);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotePage');

    this.title = this.navParams.get('title');
    this.name = this.navParams.get('name');
  }

  getHome() {
    this.navCtrl.setRoot(HomePage);
  }

  clickAdd() {
    let actionSheet = this.actionSheetCtrl.create({
        title: 'Add Note',
        buttons: [
          {
            text: 'Note',
            role: 'note',
            icon: 'book',
            handler: () => {

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
                        console.log("ok");
                      });
                    }
                  }
                ]
              });

              prompt.present();
            }
          },{
            text: 'Favourite',
            role: 'favourite',
            icon: 'heart',
            handler: () => {
              console.log('Add Favourite');
            }
          },{
            text: 'Location',
            role: 'location',
            icon: 'locate',
            handler: () => {
              console.log('Add Location');
            }
          }
        ]
      });
      actionSheet.present();
  }


}
