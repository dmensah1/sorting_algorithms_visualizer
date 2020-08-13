import { Component, OnInit } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-body',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})

export class BodyComponent implements OnInit {

  visualArr = [];
  tempArr = [];
  doBubble = false;
  doMerge = false;
  doQuick = false;
  sliderVal = 30;

  ngOnInit() {
      // display array with default size on init
      for (let i = 0; i < this.sliderVal; i++) {
        this.visualArr.push(this.createRandomNum());
      }
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
      this.performQuickSort(this.visualArr, 0, this.visualArr.length - 1);
      this.doQuick = false;

    } else if (this.doMerge) {
     this.mergeSortSplit(this.visualArr, 0, this.visualArr.length);
     this.doMerge = false;

    } else if (this.doBubble) {
      this.performBubble();
      this.doBubble = false;
    }
  }


  async mergeSortSplit(array, start, end) {
    if (end <= start) {
      return;
    }

    const middle = Math.floor(start + (end - start) / 2);
    await this.mergeSortSplit(array, start, middle);
    await this.mergeSortSplit(array, middle + 1, end);

    await this.mergeArr(array, start, middle, end);

    await this.mytimeout(250);
  }

  mytimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


 mergeArr(arr, start, mid, end) {
    const aux = [];

    for (let i = start; i <= end; i++) {
      aux[i] = arr[i];
    }

    let i = start;
    let j = mid + 1;
    for (let k = start; k <= end; k++) {
    // Case when one subarray has been exhausted.
    if (i > mid) {
      arr[k] = aux[j++];
    } else if (j > end) {
      arr[k] = aux[i++];
    } else if (aux[i] > aux[j]) {
      arr[k] = aux[j++];
    } else {
      arr[k] = aux[i++];
    }
  }
  }


  async performQuickSort(arr, min, max) {
    if (min < max) {
      const pivot = await this.partition(arr, min, max);
      await this.performQuickSort(arr, min, pivot - 1);
      await this.performQuickSort(arr, pivot + 1, max);
    }
  }

  async partition(arr, min, max) {
    let q = min, i;

    for (i = min; i < max; i++) {
      if (arr[i] < arr[max]) {
        this._swap(arr, i, q);
        await this.mytimeout(250);
        q++;
      }
    }
    this._swap(arr, i, q);
    return q;
  }

  _swap(arr, min, max) {
    const temp = arr[min];
    arr[min] = arr[max];
    arr[max] = temp;
  }


  performBubble() {
    let i = 0;
    let j = 0;

    timer(0, 250)
    .pipe(takeWhile(() => i < this.sliderVal))
    .subscribe(() => {

      while (i < this.sliderVal) {
        let change = false;

        while (j < this.sliderVal) {
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
  }
}
