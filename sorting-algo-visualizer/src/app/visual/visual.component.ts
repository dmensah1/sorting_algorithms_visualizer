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

  // setters to choose the type of sorting
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
    // clearing array
    this.visualArr.splice(0, this.sliderVal);

    this.sliderVal = val;

    // populating the array according to new size picked by user
    for (let i = 0; i < this.sliderVal; i++) {
      this.visualArr.push(this.createRandomNum());
    }

  }

  performSort() {
    if (this.doQuick) {
      this.doQuick = false;


    } else if (this.doMerge) {

      this.doMerge = false;


    } else if (this.doBubble) {
      this.doBubble = false;

      for (let i = 0; i < this.sliderVal; i++) {
        for (let j = 0; j < this.sliderVal; j++) {
          if (this.visualArr[j] > this.visualArr[j + 1]) {
            const temp = this.visualArr[j];
            this.visualArr[j] = this.visualArr[j + 1];
            this.visualArr[j + 1] = temp;
          }
        }
      }
    }
  }
}
