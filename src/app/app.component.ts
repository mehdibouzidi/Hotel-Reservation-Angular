import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Http, Response} from '@angular/http';
import  { Observable } from 'rxjs/Rx';
import  'rxjs/add/operator/map';
import  'rxjs/add/operator/catch';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public http: Http) {

  }

  private baseUrl = 'http://localhost:8080';
  public submitted: boolean;
  roomsearch: FormGroup;
  rooms: Room[];

  ngOnInit(): void {
    this.roomsearch = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl('')
    });

    console.log(this.rooms);
  }

  onSubmit({value, valid}: {value: RoomSearch, valid: boolean}) {
    this.getAll().subscribe( rooms => {
      this.rooms = rooms;
    },
      err => {
      console.log(err);
      }
      );
  }
  reserveRoom(value: string) {
        console.log('Room id for reservation: ' + value);
  }

  getAll(): Observable< Room [] > {
  return  this.http.get(this.baseUrl + '/room/reservation/v1?checkin=2017-03-18&checkout=2017-03-25')
      .map(this.mapRoom);
  }

  mapRoom(response: Response){
    return response.json().content;
  }
}

export interface RoomSearch {
  checkin: string;
  checkout: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  price: string;
  links: string;

}
