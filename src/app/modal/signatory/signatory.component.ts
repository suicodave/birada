import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimesheetServiceService } from '../../shared/timesheet-service.service';
import { formatDate } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatDialogRef } from 'node_modules/@angular/material';
@Component({
  selector: 'app-signatory',
  templateUrl: './signatory.component.html',
  styleUrls: ['./signatory.component.scss']
})
export class SignatoryComponent implements OnInit {
  signatoryForm: FormGroup
  constructor(private formBuilder: FormBuilder, private tsService: TimesheetServiceService, private dialogRef: MatDialogRef<SignatoryComponent>) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }
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

      }
    );
    this.tsService.totalDifference.subscribe(
      (data) => {
        this.totalDifference = data;

      }
    );
  }

  onFormSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    this.personalData = form.value;


    const pdfOutput = {
      content: this.buildTimeSheetArray()
    };

    const a = this.generateReport(this.personalData.employeeName, this.personalData.officerName, this.personalData.branchName);

    this.dialogRef.close();

  }

  buildTimeSheetArray() {

    const dateFormatString = 'E, MMMM dd, yyyy hh:mm a';
    const headerColumns = [
      { text: 'Start Date', alignment: 'center', style: 'cellHeader' },
      { text: 'End Date', alignment: 'center', style: 'cellHeader' },
      { text: 'Duration', alignment: 'center', style: 'cellHeader' },
      { text: 'Reason', alignment: 'center', style: 'cellHeader' }
    ];
    const timeSheetToArray = this.timeSheetData.map(
      (item) => {
        return [
          formatDate(item.startDate, dateFormatString, 'en'),
          formatDate(item.endDate, dateFormatString, 'en'), item.difference.hours + "h " + item.difference.minutes + "m",
          item.reason
        ];
      }
    );

    const timeDurationFooter = [
      { text: 'Total', alignment: 'center', style: 'footer' },

      {
        text: this.totalDifference.hours + " hour(s) and " + this.totalDifference.minutes + " minute(s)",
        colSpan: 3,
        style: 'footer',
        rowSpan: 1,
        alignment: 'center'
      },
      '',
      ''
    ];
    timeSheetToArray.unshift(headerColumns);
    timeSheetToArray.push(timeDurationFooter);

    return timeSheetToArray;
  }

  generateReport(employeeName, officerName, branchName) {
    // playground requires you to assign document definition to a variable called dd
    const dateFormatString = 'EEEE, MMMM dd, yyyy hh:mm a';
    const monthOf = formatDate(new Date(), 'MMMM', 'en');
    const dateGenerated = formatDate(new Date(), dateFormatString, 'en');

    const content = this.buildTimeSheetArray();
    var dd = {
      pageOrientation: 'landscape',
      content: [
        { text: '1st VALLEY BANK, INC. A DEVELOPMENT BANK', style: 'header' },
        { text: 'OVERTIME AUTHORIZATION/CLAIM FORM', style: 'header' },
        { text: `Month of ${monthOf}`, alignment: 'center' },
        { text: `Date Generated: ${dateGenerated}`, alignment: 'center' },

        {

          style: 'tableHeader',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', 200],
            body: content,
          },
          layout: ''
        },
        {
          style: 'tableHeader',

          table: {
            widths: ['*', '*', '*'],
            headerRows: 1,
            body: [
              [
                { text: `${employeeName}`, alignment: 'center' },
                { text: `${officerName}`, alignment: 'center' },
                { text: `${branchName}`, alignment: 'center' }
              ],
              [
                { text: 'Employee', alignment: 'center' },
                { text: 'Approving Officer/Supervisor', alignment: 'center' }, { text: 'Branch/Department', alignment: 'center' }
              ]

            ],
          },
          layout: 'headerLineOnly'
        },
      ],
      styles: {

        tableHeader: {
          fontSize: 12,
          color: 'black',
          border: 'none',
          marginTop:10
          
        },
        cellHeader: {
          margin: 2
        },
        overTime: {
          bold: true,
          fontSize: 12,
          color: 'black',
          marginTop: 35
        },
        header: {
          
          alignment: 'center',
          fontSize: 15
        },
        footer: {
          margin: 15,
          bold: true
        }
      },
      defaultStyle: {

        // alignment: 'justify'
      }

    }

    pdfMake.createPdf(dd).download();

    return dd;
  }

  

}
