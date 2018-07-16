import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TimesheetServiceService } from '../shared/timesheet-service.service';

@Component({
  selector: 'app-attendance-modal',
  templateUrl: './attendance-modal.component.html',
  styleUrls: ['./attendance-modal.component.scss']
})
export class AttendanceModalComponent implements OnInit {
  amOrPm = ['AM', 'PM'];
  timeForm: FormGroup;
  showResult = false;
  mask = [/[0-1]/, /[1-9]/, '/', /[0-3]/, /[1-9]/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /[0-1]/, /\d/, ':', /[0-6]/, /\d/];
  @Output() onRegisterTimeSheetEvent = new EventEmitter();
  startDateString;
  endDateString;
  timeDifference;
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private tsService: TimesheetServiceService) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.timeForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amPM1: [this.amOrPm[0], Validators.required],
      amPM2: [this.amOrPm[0], Validators.required],
    });
  }

  onDateTimeSubmit(form: FormGroup) {
    if (!form.valid) {
      this.snackBar.open('Invalid dates please check your entries', 'Okay');
      return;
    }
    const startDateString = this.concatDateString(form.value.startDate, form.value.amPM1);
    const endDateString = this.concatDateString(form.value.endDate, form.value.amPM2);


    if (this.validateDateFromString(startDateString) == 'Invalid Date' || this.validateDateFromString(endDateString) == 'Invalid Date') {
      this.snackBar.open('Invalid dates please check your entries', 'Okay');
      return;
    }

    this.startDateString = this.validateDateFromString(startDateString);
    this.endDateString = this.validateDateFromString(endDateString);
    this.timeDifference = this.differentiateTime(this.startDateString, this.endDateString);

    this.showResult = true;






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
      difference: this.timeDifference
    };
    this.showResult = false;
    this.snackBar.open('Saved successfully!', 'close');
    this.tsService.registerTimeSheet(data);

  }

}
