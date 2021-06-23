import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

import { ExampleDialogComponent } from './example/example-dialog.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@NgModule({
  declarations: [ExampleDialogComponent, TaskDetailComponent],
  entryComponents: [ExampleDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DialogModule {}
