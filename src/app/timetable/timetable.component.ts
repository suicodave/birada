import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TimeSheetDataSource } from '../shared/time-sheet-data-source';
import { TimesheetServiceService } from '../shared/timesheet-service.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  @Input() data = [];
  dataSource: TimeSheetDataSource;
  displayedColumns = ['startDate', 'endDate', 'difference', 'remove'];

  constructor(private tsService: TimesheetServiceService) { }


  ngOnInit() {
    this.dataSource = new TimeSheetDataSource(this.tsService);
  }
  deleteTime(data) {
    console.log(data);

  }




}

export interface TimeSheet {
  startDate: string;
  endDate: string;
  difference: {
    hours: string,
    minutes: string
  };
}

