import { TestBed, inject } from '@angular/core/testing';

import { TimesheetServiceService } from './timesheet-service.service';

describe('TimesheetServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimesheetServiceService]
    });
  });

  it('should be created', inject([TimesheetServiceService], (service: TimesheetServiceService) => {
    expect(service).toBeTruthy();
  }));
});
