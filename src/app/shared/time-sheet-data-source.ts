import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { TimeSheet } from "../timetable/timetable.component";
import { Observable } from "rxjs";
import { TimesheetServiceService } from "./timesheet-service.service";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class TimeSheetDataSource extends DataSource<any>{

    constructor(private tsService: TimesheetServiceService) {
        super();
    }

    connect(): Observable<TimeSheet[]> {

        return this.tsService.timeSheetChange;
    }

    disconnect(collectionViewer: CollectionViewer) {

    }


}