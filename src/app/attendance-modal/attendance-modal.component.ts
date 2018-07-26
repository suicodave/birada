import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TimesheetServiceService } from '../shared/timesheet-service.service';

@Component({
  selector: 'app-attendance-modal',
  templateUrl: './attendance-modal.component.html',
  styleUrls: ['./attendance-modal.component.scss']
})
export class AttendanceModalComponent implements OnInit {
  OVERTIME_START = [
    ['8:00 AM', '05:30 PM'],
    ['10:00 AM ', '07:30 PM'],
    ['01:00 PM', '09:30 PM']
  ];
  amOrPm = ['AM', 'PM'];
  timeForm: FormGroup;
  showResult = false;

  startDateString;
  endDateString;
  timeDifference;
  reason;

  mask1 = [/[0-1]/, /[1-9]/, '/', /[0-3]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/];
  mask2 = [/[0-1]/, /[1-9]/, '/', /[0-3]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /[0-1]/, /\d/, ':', /[0-6]/, /\d/];

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private tsService: TimesheetServiceService) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.timeForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      timeSlot: [this.OVERTIME_START[0][1], Validators.required],
      amPM2: [this.amOrPm[1], Validators.required],
      reason: ['', Validators.required]
    });
  }

  onDateTimeSubmit(form: FormGroup) {
    if (!form.valid) {
      this.snackBar.open('Invalid data please check your entries!', 'Okay');
      return;
    }
    const startDateString = this.concatDateString(form.value.startDate, form.value.timeSlot);
    const endDateString = this.concatDateString(form.value.endDate, form.value.amPM2);


    if (this.validateDateFromString(startDateString) == 'Invalid Date' || this.validateDateFromString(endDateString) == 'Invalid Date') {
      this.snackBar.open('Invalid data please check your entries!', 'Okay');
      return;
    }

    this.startDateString = this.validateDateFromString(startDateString);
    this.endDateString = this.validateDateFromString(endDateString);
    this.timeDifference = this.differentiateTime(this.startDateString, this.endDateString);
    this.reason = form.value.reason;



    this.registerTimeSheet();

  }



  concatDateString(startDate, amPM) {
    return startDate + ' ' + amPM
  }

  validateDateFromString(date): any {
    return new Date(date);
  }

  differentiateTime(startDate, endDate) {

    const difference = endDate - startDate;
    const hours = difference / 1000 / 60 / 60;
    const minutes = difference / 1000 / 60 % 60;

    return {
      hours: Math.trunc(hours),
      minutes: minutes
    };
  }

  registerTimeSheet() {
    const data = {
      startDate: this.startDateString,
      endDate: this.endDateString,
      difference: this.timeDifference,
      reason: this.reason
    };
    this.showResult = false;
    this.tsService.registerTimeSheet(data).subscribe(
      (insertedData) => {
        this.snackBar.open('Data has been saved.', 'Close');
      }
    );
  }

}
