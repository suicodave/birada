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
  isCustomOvertime = false;
  startDateString;
  startDatePlaceholder = 'mm/dd/yyy';
  endDateString;
  timeDifference;
  reason;

  startDateMask = [/[0-1]/, /[1-9]/, '/', /[0-3]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/];
  endDateMask = [/[0-1]/, /[1-9]/, '/', /[0-3]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /[0-1]/, /\d/, ':', /[0-6]/, /\d/];

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

  toggleCustomOvertime() {
    this.isCustomOvertime = !this.isCustomOvertime;
    if (this.isCustomOvertime) {
      this.timeForm.controls.timeSlot.patchValue(this.amOrPm[1]);
      this.startDateMask = [...this.startDateMask, ' ', /[0-1]/, /\d/, ':', /[0-6]/, /\d/];
      this.startDatePlaceholder = 'mm/dd/yyy hh:mm';
    } else {
      this.timeForm.controls.timeSlot.patchValue(this.OVERTIME_START[0][1]);
      this.startDatePlaceholder = 'mm/dd/yyy';
      this.startDateMask = [/[0-1]/, /[1-9]/, '/', /[0-3]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/];
    }
    this.timeForm.controls.startDate.patchValue('');
    return this.isCustomOvertime;
  }

  onDateTimeSubmit(form: FormGroup) {
    if (!form.valid) {
      this.snackBar.open('Invalid data please check your entries!', 'Okay');
      return;
    }
    const startDateString = this.concatDateString(form.value.startDate, form.value.timeSlot);
    const endDateString = this.concatDateString(form.value.endDate, form.value.amPM2);


    if (this.areDatesValid(startDateString, endDateString)) {
      this.snackBar.open('Invalid data please check your entries!', 'Okay');
      return;
    }

    this.startDateString = this.validateDateFromString(startDateString);
    this.endDateString = this.validateDateFromString(endDateString);
    this.timeDifference = this.differentiateTime(this.startDateString, this.endDateString);
    this.reason = form.value.reason;



    this.registerTimeSheet();

  }

  areDatesValid(startDateString, endDateString) {
    return this.validateDateFromString(startDateString) == 'Invalid Date' || this.validateDateFromString(endDateString) == 'Invalid Date';
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
