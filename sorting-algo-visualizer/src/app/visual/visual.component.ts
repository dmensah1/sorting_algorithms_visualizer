import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})

export class BodyComponent implements OnInit {

  visualArr = [];
  doBubble = false;
  doMerge = false;
  doQuick = false;
  sliderVal = 30;

  ngOnInit() {

      // display array with default size on init
      for (let i = 0; i < this.sliderVal; i++) {
        this.visualArr.push(this.createRandomNum());
      }

      // need to generate div components with same width but diff heights based on their rand num


  }

  createRandomNum() {
    return Math.floor(Math.random() * (250 - 50 + 1)) + 50;
  }

  setQuick() {
    this.doQuick = true;
  }

  setBubble() {
    this.doBubble = true;
  }

  setMerge() {
    this.doMerge = true;
  }

  onChange(val) {
    this.sliderVal = val;
  }

  performSort() {
    if (this.doQuick) {
      // perform quick sort here
    } else if (this.doMerge) {

      // perform merge sort here

    } else if (this.doBubble) {

      // perform bubble sort here

    }
  }
}
