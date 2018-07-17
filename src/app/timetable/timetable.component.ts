import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TimeSheetDataSource } from '../shared/time-sheet-data-source';
import { TimesheetServiceService } from '../shared/timesheet-service.service';
import { SignatoryComponent } from '../modal/signatory/signatory.component';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  @Input() data = [];
  dataSource: TimeSheetDataSource;
  displayedColumns = ['startDate', 'endDate', 'difference', 'remove'];
  totalDifference;
  constructor(private tsService: TimesheetServiceService, private snackBar: MatSnackBar, private signatoryModal: MatDialog) { }


  ngOnInit() {
    this.dataSource = new TimeSheetDataSource(this.tsService);
    this.tsService.totalDifference.subscribe(
      (val) => this.totalDifference = val
    );

  }
  deleteTime(data) {

    this.tsService.deleteTimeSheet(data).subscribe(
      (data) => {
        const snackbar = this.snackBar.open('Data has been removed.', 'Undo', {
          duration: 3000
        });
        snackbar.afterDismissed().subscribe(
          (isForcedDismissed) => this.undoDeletion(isForcedDismissed.dismissedByAction, data)

        );
      }
    );
  }

  undoDeletion(isForcedDismissed, data) {
    if (!isForcedDismissed) {
      return;
    }
    this.tsService.registerTimeSheet(data).subscribe(
      (restoredData) => this.snackBar.open('Data has been restored.', 'Close', {
        duration: 3000
      })
    )

  }

  openSignatoryModal() {
    this.signatoryModal.open(SignatoryComponent, {
      width: '300px'
    })
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

