import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimeSheet } from '../timetable/timetable.component';


@Injectable({
  providedIn: 'root'
})
export class TimesheetServiceService {
  data = [];
  timeSheetChange: BehaviorSubject<TimeSheet[]> = new BehaviorSubject<TimeSheet[]>([]);
  totalDifference: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor() {

  }

  totalDuration(data: TimeSheet[]) {
    const mapHours = data.map(item => item.difference.hours);
    const mapMinutes = data.map(item => item.difference.minutes);

    const hours = mapHours.reduce((a, b): number => { return a + parseInt(b) }, 0);
    const minutes = mapMinutes.reduce((a, b): number => { return a + parseInt(b) }, 0);

    const convertExact = this.excessMinutesToHours(minutes);

    return {
      hours: hours + convertExact.additionalHours,
      minutes: convertExact.fixedMinutes
    };

  }

  excessMinutesToHours(minutes) {
    const toHours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return {
      additionalHours: toHours,
      fixedMinutes: remainingMinutes
    }
  }

  registerTimeSheet(data: TimeSheet) {
    this.data.push(data);

    this.timeSheetChange.next(this.data);
    const newData = {
      startDate: data.startDate,
      endDate: data.endDate,
      difference: data.difference,
      reason: data.reason
    };

    const totalDifference = this.totalDuration(this.data);
    this.totalDifference.next(totalDifference);

    return Observable.create(function (observer) {
      observer.next(newData);
    });;
  }

  deleteTimeSheet(data: TimeSheet) {

    const newData = this.data.filter(
      (currentData) => {
        return currentData != data;
      }
    );
    this.data = newData;
    this.timeSheetChange.next(this.data);
    const totalDifference = this.totalDuration(this.data);
    this.totalDifference.next(totalDifference);
    return Observable.create(function (observer) {
      observer.next(data);
    });;

  }



}
