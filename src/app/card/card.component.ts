import { Component, OnInit, Output, Inject } from '@angular/core';
// import {MdProgressBarModule} from '@angular/material';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
 // @Output () image = 'aoc-sentiment-neutral';

  position = 'aoc-sentiment-very-happy chat-send-button send';
  name: string;
  animal: string;
 constructor() {}
ngOnInit() {
  }

}


