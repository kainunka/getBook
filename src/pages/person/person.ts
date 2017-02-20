import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Camera } from 'ionic-native';

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

  public base64Image: string;
  per: FirebaseListObservable<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, angFire: AngularFire) {

    this.per = angFire.database.list('/undefined/person');
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



    addPer(name, description, friend, family, boy, girl) {
      this.per.push({
        name: name,
        description: description,
        friend: friend,
        family: family,
        boy: boy,
        girl: girl
      }).then((success) => {
          console.log(success);
          let toast = this.toastCtrl.create({
            message: 'Success...',
            duration: 3000
          });
          toast.present();
      });
    }


}
