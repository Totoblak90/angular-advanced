import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators'

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent implements OnInit, OnDestroy {

  public text1: string = 'I am an observable that watches the counter 1';
  public counter1: number = 0;

  public text2: string = 'I am an observable that watches the counter 2';
  public counter2: number = 0;

  public text3: string = 'I am an observable that watches the counter 3';
  public counter3: number = 0;

  public text4: string = 'I am interval observable from rxjs that watches counter 4. I am using map and take rxjs operators.'
  public counter4: number;

  public text5: string = 'I am interval observable from rxjs that watches counter 5. I am using filter rxjs operators. i will go from two on two.'
  public counter5: number;

  public intervalWithoutTake: Subscription;
  public text6: string = 'I am interval observable from rxjs that watches counter 6. I will stop emmiting values when the component destroys.'
  public counter6: number;

  constructor() { }


  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    this.initObservable1()
        .subscribe(
          value => {this.counter1 = value;},
          error => this.text1 = error,
          () => this.text1 = 'I have completed without failure'
        )

    this.initObservable2()
        .subscribe(
          value => this.counter2 = value,
          error => this.text2 = error,
          () => this.text2 = 'I will never complete'
        )

    this.initObservable3()
        .pipe(
          retry(1)
        )
        .subscribe(
          value => this.counter3 = value,
          error => this.text3 = error,
          () => this.text3 = 'I retried so I could complete'
        )

    this.initIntervalRXJS()
        .subscribe(
          value => this.counter4 = value,
          err => console.log(err),
          () => this.text4 = 'I have completed without failure'
        )
    this.initIntervalRXJS2()
        .subscribe(
          value => this.counter5 = value,
          err => console.log(err),
          () => this.text5 = 'I have completed without failure'
        )

    this.intervalWithoutTake = this.initIntervalRXJS3()
        .subscribe(
          value => this.counter6 = value
        )
  }

  private initObservable1(): Observable<number> {
    let i = 0;
    return new Observable(observer => {
      const interval = setInterval(() => {
        i++
        observer.next(i)
        if (i >= 5) {
          observer.complete();
          clearInterval(interval)
        }

      }, 1000)
    } )
  }

  private initObservable2(): Observable<number> {
    let i = 0;
    return new Observable(observer => {
      const interval = setInterval(() => {
        i++
        observer.next(i)
        if (i >= 5) {
          observer.complete();
          clearInterval(interval)
        }

        if (i === 3) {
          observer.error('I failed')
        }

      }, 1000)
    } )
  }

  private initObservable3(): Observable<number> {
    let i = 0;
    return new Observable(observer => {
      const interval = setInterval(() => {
        i++
        observer.next(i)
        if (i >= 6) {
          observer.complete();
          clearInterval(interval)
        }

        if (i === 3) {
          observer.error('I failed')
        }

      }, 1000)
    } )
  }

  private initIntervalRXJS(): Observable<number> {
    return interval(1000).pipe(take(5), map(value => value + 1))
  }

  private initIntervalRXJS2(): Observable<number> {
    return interval(500).pipe(take(10), map(value => value + 1), filter(value => value%2 === 0))
  }

  private initIntervalRXJS3(): Observable<number> {
    return interval(500).pipe(map(value => value + 1), filter(value => value%2 === 0))
  }

  ngOnDestroy(): void {
    this.intervalWithoutTake.unsubscribe();
  }

}
