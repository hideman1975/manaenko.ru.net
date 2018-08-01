import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {
  icons: string[] = [
    'aoc-sentiment-very-happy chat-send-button send',
    'aoc-sentiment-happy chat-send-button send',
    'aoc-sentiment-neutral chat-send-button send',
    'aoc-sentiment-sad chat-send-button send',
    'aoc-sentiment-very-sad chat-send-button send'
  ];
  constructor() { }



  ngOnInit() {
  }

}
