import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Camera } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the Person page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage {

  base64Image: string;
  per: FirebaseListObservable<any>;
  local: any;
  rootPer: any;
  friend: any; family: any; boy: any; girl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, angFire: AngularFire) {


    this.base64Image = 'assets/avartar-home.png';

    this.local = new Storage();
    this.local.set('name', 'golf');

    this.local.get('name').then((data) => {
      this.per = angFire.database.list('/' + data + '/personal');
    })

    this.friend = false;
    this.family = false;
    this.boy = false;
    this.girl = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }


  takePic() {
    console.log("take OK");

      let prompt = this.alertCtrl.create({
        title: 'Add Person',
        message: 'เพิ่มรูปภาพบุคคลที่คุณรู้จัก',
        buttons: [
          {
            text: "Take a Picture",
            handler: data => {
              console.log("Take a Picture");

              Camera.getPicture({
                destinationType: Camera.DestinationType.DATA_URL,
                targetWidth: 1000,
                targetHeight: 1000
              }).then((imageData) => {
                this.base64Image = "data:image/jpeg;base64," + imageData;
              }, (error) => {
                  console.log(error);
              });


            }
          },
          {
            text: "Choose From Gallary",
            handler: data => {
              console.log("Choose From Gallary");
            }
          }
        ]
      });

      prompt.present();
  }



    addPer(name, description, friend, family, boy, girl, picture) {

      if (friend == false && family == false && boy == false && girl == false) {

        let prompt = this.alertCtrl.create({
          title: 'Error',
          message: 'Please Checkbox',
          buttons: [
            {
              text: "Canncel",
              handler: data => {
                console.log("Canncel");
              }
            }
          ]
        });

        prompt.present();

      } else {
        this.per.push({
          name: name,
          description: description,
          friend: friend,
          family: family,
          boy: boy,
          girl: girl,
          picture: picture
        }).then((success) => {
            console.log(success);
            let toast = this.toastCtrl.create({
              message: 'Success...',
              duration: 3000
            });
            toast.present();
            this.navCtrl.pop();
        });

      }

    }


}
