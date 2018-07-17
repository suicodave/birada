import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ControlsComponent } from './controls/controls.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimetableComponent } from './timetable/timetable.component';
import { AttendanceModalComponent } from './attendance-modal/attendance-modal.component';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { TimeSheetDataSource } from './shared/time-sheet-data-source';
import { TimesheetServiceService } from './shared/timesheet-service.service';
import { SignatoryComponent } from './modal/signatory/signatory.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ControlsComponent,
    TimetableComponent,
    AttendanceModalComponent,
    AttendanceModalComponent,
    SignatoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [TimeSheetDataSource, TimesheetServiceService],
  bootstrap: [AppComponent],
  entryComponents: [SignatoryComponent]
})
export class AppModule { }
