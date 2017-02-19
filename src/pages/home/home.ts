import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';

import { NotePage } from '../note/note';
import { Note } from '../../providers/note';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ Note ]
})
export class HomePage {
  items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private note: Note, angFire: AngularFire, public loadingController: LoadingController) {

      this.items = angFire.database.list('/undefined/personal');

      console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  addList():void {
    let prompt = this.alertCtrl.create({
      title: 'Title1',
      message: 'Author1',
      inputs: [
        {
          name: 'title',
          placeholder: 'List Title'
        },
        {
          name: 'author',
          placeholder: 'author'
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
            this.items.push({
              title: data.title,
              author: data.author
            }).then((res) => {
              console.log("ok");
            });
          }
        }
      ]
    });

    prompt.present();
  }




  editList(item):void {
    let prompt = this.alertCtrl.create({
      title: 'Edit Item',
      message: 'Edit Items Author',
      inputs: [
        {
          name: 'title',
          placeholder: item.title
        },
        {
          name: 'author',
          placeholder: item.author
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

            let newTitle: String = item.title;
            let newAuthor: String = item.author;

            if (data.title != '') {
              newTitle = data.title;
            }
            if (data.author != '') {
              newAuthor = data.author;
            }

            this.items.update(item.$key, {
              title: newTitle,
              author: newAuthor
            });


          }
        }
      ]
    });

    prompt.present();
  }


  deleteItem(itemID):void {
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
            this.items.remove(itemID);
          }
        }
      ]
    });
    prompt.present();
  }



  goToNote(key) {
    this.navCtrl.push(NotePage, {
      key: key
    });
    this.note.CallNote();

    this.note.CallNotePromise().then((data) => {
      console.log(data);
    });

    this.note.CallNoteHttp().subscribe((data) => {
      console.log(data);
    });
  }

}
