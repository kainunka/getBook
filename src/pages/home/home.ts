import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

import { NotePage } from '../note/note';
import { Note } from '../../providers/note';
import { PersonPage } from '../person/person';
import { LoginPage } from '../login/login';
import { ListPersonalPage } from '../list-personal/list-personal';
import { ViewVideoPage } from '../view-video/view-video';
import { ViewAllPage } from '../view-all/view-all';

import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';
import { Storage } from '@ionic/storage';

//import "rxjs/add/operator/map";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ Note ]
})
export class HomePage {
  items: FirebaseListObservable<any>;
  local: any;
  user: any;
  userReady: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private note: Note, angFire: AngularFire) {

    let env = this;
    env.user = {
      name: '',
      picture: 'assets/avartar.png',
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




      console.log(this.items);
      console.log("test");

      this.local = new Storage();
      this.local.set('name', 'golf');

      this.local.get('name').then((data) => {
        this.items = angFire.database.list('/' + data + '/personal').map((array) => array.reverse()) as FirebaseListObservable<any[]>;

      })

      this.local.get('uid').then((data) => {
        console.log("UID = " + data);
      })

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  doLogout() {
    var nav = this.navCtrl;
    NativeStorage.remove('user');
    nav.setRoot(LoginPage);

  }


  viewVideo() {
    this.navCtrl.push(ViewVideoPage);
  }

  viewAll() {
    this.navCtrl.push(ViewAllPage);
  }


  logout() {
    this.local.remove('uid');
    this.navCtrl.setRoot(LoginPage);
    location.reload();
  }

  addPer() {
    this.navCtrl.push(PersonPage);
  }

  showPer() {
    this.navCtrl.push(ListPersonalPage);
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
