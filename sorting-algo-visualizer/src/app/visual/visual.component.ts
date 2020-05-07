import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

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
  delayFlag = false;
  currTime = Date.now();




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
      this.performBubble();
      this.doBubble = false;
    }
  }

  performBubble() {
    let i = 0;
    let j = 0;

    timer(0, 100)
    .pipe(takeWhile(() => i < this.sliderVal))
    .subscribe(() => {

      while ( i < this.sliderVal) {
        let change = false;

        while ( j < this.sliderVal) {

          if (this.visualArr[j] > this.visualArr[j + 1]) {
            change = true;
            const temp = this.visualArr[j];
            this.visualArr[j] = this.visualArr[j + 1];
            this.visualArr[j + 1] = temp;
            break;
          }

          j++;
        }

        if (change) { break; }
        if (j === this.sliderVal) {
          j = 0;
          i++;
        }
      }
    });


    /* for (let i = 0; i < this.sliderVal; i++) {
      for (let j = 0; j < this.sliderVal; j++) {
        if (this.visualArr[j] > this.visualArr[j + 1]) {
          const temp = this.visualArr[j];
          this.visualArr[j] = this.visualArr[j + 1];
          this.visualArr[j + 1] = temp;
        }
      }
    }  */

  }

  delayFunc() {
    this.delayFlag = false;

    while (!this.delayFlag) {
      if ((Date.now() - this.currTime) > 1000) {
        this.delayFlag = true;
        console.log('delay occurred');
        break;
      }
    }

  }


}
