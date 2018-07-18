import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatSidenavModule, MatTableModule, MatFormFieldModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDialogModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }
    }
  ],
  declarations: []
})
export class MaterialModule { }
