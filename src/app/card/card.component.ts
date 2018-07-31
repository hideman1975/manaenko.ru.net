import { Component, OnInit, Output, Inject } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
 // @Output () image = 'aoc-sentiment-neutral';
 icons: string[] = [
    'aoc-sentiment-very-happy chat-send-button send',
    'aoc-sentiment-happy chat-send-button send',
    'aoc-sentiment-neutral chat-send-button send',
    'aoc-sentiment-sad chat-send-button send',
    'aoc-sentiment-very-sad chat-send-button send'
  ];
  position = 'aoc-sentiment-very-happy chat-send-button send';
  name: string;
  animal: string;
 constructor() {}
ngOnInit() {
  }

}


