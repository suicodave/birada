import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AttendanceModalComponent } from '../attendance-modal/attendance-modal.component';
import { TimeSheetDataSource } from '../shared/time-sheet-data-source';
import { TimesheetServiceService } from '../shared/timesheet-service.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  timeSheetData = [];
  constructor(private timeSheetDataSource: TimeSheetDataSource, private tSService: TimesheetServiceService) {

   }

  ngOnInit() {
  }

  getTimeSheet(event) {
    console.log(event);
    this.timeSheetData = [...this.timeSheetData, event];
    console.log(this.timeSheetData);

    console.log('asd');


  }

}
