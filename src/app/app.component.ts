import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public submitted: boolean;
  roomsearch: FormGroup;
  rooms: Room[];

  ngOnInit(): void {
    this.roomsearch = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl('')
    });
    this.rooms = ROOMS;
    console.log(this.rooms);
  }

  onSubmit({value, valid}: {value: RoomSearch, valid: boolean}) {
    console.log(value);
  }
  reserveRoom(value: string) {
        console.log("Room id for reservation: " + value);
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

const ROOMS: Room[] = [
  {
    'id': '545689',
    'roomNumber': '409',
    'price': '20',
    'links' : ''
  },
  {
    'id': '21589',
    'roomNumber': '410',
    'price': '25',
    'links' : ''
  },
  {
    'id': '74987',
    'roomNumber': '411',
    'price': '28',
    'links' : ''
  }
];
