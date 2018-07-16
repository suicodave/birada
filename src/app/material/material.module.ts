import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatSidenavModule, MatTableModule, MatFormFieldModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDialogModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

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
    MatCheckboxModule
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
    MatCheckboxModule
  ],
  declarations: []
})
export class MaterialModule { }
