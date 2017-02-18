import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Note provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Note {

  constructor(public http: Http) {
    console.log('Hello Note Provider');
  }

  CallNote() {
    return "Hello CallNote Loaded!";
  }

  CallNotePromise() {
    return Promise.resolve("Hello Note Promise");
  }

  CallNoteHttp() {
    return this.http.get('http://time.jsontest.com').map((res) => res.json());
  }

}
