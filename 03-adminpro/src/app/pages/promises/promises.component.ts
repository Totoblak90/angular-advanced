import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  text: string = 'I am a promise (wait)'
  test: boolean;

  constructor() { }

  ngOnInit(): void {
    this.test = true;
    setTimeout(() => {
      this.initPromise()
        .then(() => {
          this.text = 'I am a promise that resolved'
          this.test = false;
          setTimeout(() => {
            this.initPromise()
              .catch(err => {
                this.text = 'I have executed again and failed'
              });
          }, 1500)
        })
    }, 1500 )
  }

  initPromise(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.test) {
        resolve('');
      } else {
        reject('');
      }
    })
  }

}
