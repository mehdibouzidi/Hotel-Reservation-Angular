import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Http, Response, RequestOptions} from '@angular/http';
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
  currentCheckInValue: string;
  currentCheckOutValue: string;
  request: any;
  ngOnInit(): void {
    this.roomsearch = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl('')
    });
    const roomsearchValueChanges$ = this.roomsearch.valueChanges;
    roomsearchValueChanges$.subscribe(
      valChange => {
        this.currentCheckInValue = valChange.checkin;
        this.currentCheckOutValue = valChange.checkout;
      }
    );
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
    this.request = new ReserveRoomRequest(value, this.currentCheckInValue, this.currentCheckOutValue);
  }

  getAll(): Observable< Room [] > {
    return  this.http.get(this.baseUrl + '/room/reservation/v1?checkin=' +  this.currentCheckInValue + ' 8&checkout=' + this.currentCheckOutValue)
      .map(this.mapRoom);
  }

  createReservation(body: ReserveRoomRequest ) {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    const option = new RequestOptions({headers});

    this.http.post(this.baseUrl + '/room/reservation/V1', body, option)
      .subscribe(res => {
        console.log(res);
      });
  }

  mapRoom(response: Response) {
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

export  class ReserveRoomRequest {
  roomId: string;
  checkin: string;
  checkout: string;

  constructor(  roomId: string,
                checkin: string,
                checkout: string) {
    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkin;
  }
}
