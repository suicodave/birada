import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimesheetServiceService } from '../../shared/timesheet-service.service';

@Component({
  selector: 'app-signatory',
  templateUrl: './signatory.component.html',
  styleUrls: ['./signatory.component.scss']
})
export class SignatoryComponent implements OnInit {
  signatoryForm: FormGroup
  constructor(private formBuilder: FormBuilder, private tsService: TimesheetServiceService) { }
  personalData;
  timeSheetData;
  totalDifference;
  ngOnInit() {
    this.initForm();
    this.getTimeSheetData();
  }

  initForm() {
    this.signatoryForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      officerName: ['', Validators.required],
      branchName: ['', Validators.required]
    });
  }

  getTimeSheetData() {
    this.tsService.timeSheetChange.subscribe(
      (data) => {
        this.timeSheetData = data;
        console.log(this.timeSheetData);

      }
    );
    this.tsService.totalDifference.subscribe(
      (data) => {
        this.totalDifference = data;
        console.log(this.totalDifference);

      }
    );
  }

  onFormSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    this.personalData = form.value;

  }

}
