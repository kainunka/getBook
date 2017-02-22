import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';


/*
  Generated class for the SlideZoom page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-slide-zoom',
  templateUrl: 'slide-zoom.html'
})
export class SlideZoomPage {

  private photos: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
      this.createPhotos();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlideZoomPage');
  }

  private createPhotos(length:number = 4) {
   for (let i = 1; i < length; i++) {
     this.photos.push({
       url: `assets/img/${i}.jpg`,
     });
   }
  }

  private openModal() {
   let modal = this.modalCtrl.create(GalleryModal, {
     photos: this.photos,
     initialSlide: 1, // The second image
   });
   modal.present();
  }




}
