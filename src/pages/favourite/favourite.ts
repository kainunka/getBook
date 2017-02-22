import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Favourite page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html'
})
export class FavouritePage {

  itemList: any;
  keyItem: any;
  des: any;
  favourite: FirebaseListObservable<any>;
  local: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, angFire: AngularFire) {

    this.keyItem = navParams.get('key');
    this.local = new Storage();

    console.log(this.keyItem);

    this.local.get('name').then((data) => {
      this.favourite = angFire.database.list('/' + data + '/favourite/' + this.keyItem);
    })

    this.itemList = [{
      id: 1,
      title: "Sports",
      description: "หมวดความชอบกีฬา",
      img: "sport.png",
      icon: "add",
      status: true
    }, {
      id: 2,
      title: "Foods",
      description: "หมวดความชอบอาหาร",
      img: "food.png",
      icon: "add",
      status: true
    }, {
      id: 3,
      title: "Games",
      description: "หมวดความชอบเกมส์",
      img: "game.png",
      icon: "add",
      status: true
    }, {
      id: 4,
      title: "Movies",
      description: "หมวดความชอบหนัง",
      img: "movie.png",
      icon: "add",
      status: true
    }, {
      id: 5,
      title: "Musics",
      description: "หมวดความชอบเพลง",
      img: "music.png",
      icon: "add",
      status: true
    }, {
      id: 6,
      title: "other",
      description: "หมวดความชอบทั่วไป อื่นๆ",
      img: "other.png",
      icon: "add",
      status: true
    }];

    console.log(JSON.stringify(this.itemList));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritePage');
  }

  addFav(title, fav) {
    console.log(title);
    console.log(fav);

    if (fav == "sport.png") {
      this.des = "หมวดกีฬา";
    } else if (fav == "food.png") {
      this.des = "หมวดอาหาร";
    } else if (fav == "game.png") {
      this.des = "หมวดเกมส์";
    } else if (fav == "movie.png") {
      this.des = "หมวดหนัง";
    } else if (fav == "music.png") {
      this.des = "หมวดเพลง";
    } else {
      this.des = "หมวดอื่นๆ";
    }

    this.favourite.push({
      title: title,
      favourite: fav,
      description: this.des
    }).then((res) => {
      console.log("ok");

      let toast = this.toastCtrl.create({
        message: 'Success...',
        duration: 3000
      });
      toast.present();

      this.navCtrl.pop();
    });


  }



}
