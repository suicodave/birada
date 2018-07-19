import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TimesheetServiceService } from '../shared/timesheet-service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-attendance-modal',
  templateUrl: './attendance-modal.component.html',
  styleUrls: ['./attendance-modal.component.scss']
})
export class AttendanceModalComponent implements OnInit {
  OVERTIME_START = '05:30 PM';
  amOrPm = ['AM', 'PM'];
  timeForm: FormGroup;
  showResult = false;

<<<<<<< HEAD

  mask1 = [/[0-1]/, /[1-9]/, '/', /[0-3]/, /[1-9]/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /[0-1]/, /[5-9]/, ':', /[0-6]/, /\d/];
  mask2 = [/[0-1]/, /[1-9]/, '/', /[0-3]/, /[1-9]/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /[0-1]/, /\d/, ':', /[0-6]/, /\d/];
=======
  mask1 = [/[0-1]/, /[1-9]/, '/', /[0-3]/, /[1-9]/, '/', /\d/, /\d/, /\d/, /\d/];
  mask2 = [/[0-1]/, /[1-9]/, '/', /[0-3]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /[0-1]/, /\d/, ':', /[0-6]/, /\d/];
>>>>>>> 141937c98eead0a5dfedcef2415d02472c37ab42
  @Output() onRegisterTimeSheetEvent = new EventEmitter();
  startDateString;
  endDateString;
  timeDifference;
  reason;
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private tsService: TimesheetServiceService) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.timeForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amPM2: [this.amOrPm[0], Validators.required],
      reason: ['', Validators.required]
    });
  }

  onDateTimeSubmit(form: FormGroup) {
    if (!form.valid) {
      this.snackBar.open('Invalid data please check your entries!', 'Okay');
      return;
    }
<<<<<<< HEAD
    const startDateString = this.concatDateString(form.value.startDate, 'PM');
=======
    const startDateString = this.concatDateString(`${form.value.startDate} 05:30`, 'PM');
>>>>>>> 141937c98eead0a5dfedcef2415d02472c37ab42
    const endDateString = this.concatDateString(form.value.endDate, form.value.amPM2);


    if (this.validateDateFromString(startDateString) == 'Invalid Date' || this.validateDateFromString(endDateString) == 'Invalid Date') {
      this.snackBar.open('Invalid data please check your entries!', 'Okay');
      return;
    }

    this.startDateString = this.validateDateFromString(startDateString);
    this.endDateString = this.validateDateFromString(endDateString);
    this.timeDifference = this.differentiateTime(this.startDateString, this.endDateString);
    this.reason = form.value.reason;

    const shouldStartAtFiveThirty = this.shouldStartAtFiveThirty(this.startDateString);

    if (!shouldStartAtFiveThirty) {
      this.snackBar.open(`Overtime must start at ${this.OVERTIME_START}. Please check your starting date and time.`, 'Close');
      return;
    }

    this.registerTimeSheet();
    this.timeForm.reset();

  }

  shouldStartAtFiveThirty(date) {
    const extractedDate = formatDate(date, 'MM/dd/yyyy', 'en');

    const fiveThirtyDate = `${extractedDate} ${this.OVERTIME_START}`;
    const startDate = formatDate(date, 'MM/dd/yyyy hh:mm a', 'en');

    const convertedFiveThirtyDate = new Date(fiveThirtyDate);
    const convertedStartDate = new Date(startDate);

    return convertedStartDate >= convertedFiveThirtyDate;
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
