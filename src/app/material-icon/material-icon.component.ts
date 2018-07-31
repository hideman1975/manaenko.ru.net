import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-material-icon',
  templateUrl: './material-icon.component.html',
  styleUrls: ['./material-icon.component.css']
})
export class MaterialIconComponent implements OnInit {
@Input() image = 'aoc-sentiment-very-happy chat-send-button send';
  constructor() { }

  ngOnInit() {
    console.log('I am born');
  }

}
