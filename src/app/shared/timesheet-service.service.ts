import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeSheet } from '../timetable/timetable.component';

@Injectable({
  providedIn: 'root'
})
export class TimesheetServiceService {
  data = [];
  timeSheetChange: BehaviorSubject<TimeSheet[]> = new BehaviorSubject<TimeSheet[]>([]);

  constructor() {

  }

  registerTimeSheet(data) {
    this.data.push(data);
    console.log(data);
    
    this.timeSheetChange.next(this.data);
    return {
      startDate: data.startDate,
      endDate: data.endDate,
      difference: data.difference,
    };
  }

}
