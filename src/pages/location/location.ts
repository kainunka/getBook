import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  Geolocation } from 'ionic-native';

declare var google;


@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  keyItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewLoaded() {
    this.loadMap();
  }

  loadMap() {

    Geolocation.getCurrentPosition().then((position) => {
      let lanLng = new google.maps.Latlng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: lanLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
        console.log(err);
    });

  }


  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);
  }


  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }


}
