import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {Task} from '../../../models/task';
import {ApiServiceService} from '../../../services/api-service.service';
import { ExampleDialogComponent } from '../example/example-dialog.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.sass']
})
export class TaskDetailComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<TaskDetailComponent>, public dialog: MatDialog,
   @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private apiService: ApiServiceService) {}
  task = new FormControl('', [Validators.required]);
  id = new FormControl('', [Validators.required]);
  dueDate = new FormControl('', [Validators.required]);
  status = new FormControl('', [Validators.required]);
  statuses:any = [
    {
      value: "not-started",
      viewValue: "not-started"
    },
    {
      value: "in-progress",
      viewValue: "in-progress"
    },
    {
      value: "done",
      viewValue: "done"
    }
  ]

  taskForm = this.formBuilder.group({
    id: [''],
    task: ['', Validators.required],
    status: ['', Validators.required],
    dueDate: ['', Validators.required]
  });

  taskDetails:Task = {
    id: '',
    task: '',
    status: '',
    dueDate: ''
  }
  formSubmitted:boolean = false;

  getErrorMessage() {
    if (this.task.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.status.hasError('required')) {
      return 'You must select status';
    }

    return this.dueDate.hasError('required') ? 'Please select Due Date' : '';
  }

  ngOnInit(): void {
    if(this.data.id) {
      this.taskDetails = this.data;
      this.id.setValue(this.taskDetails.id);
      this.task.setValue(this.taskDetails.task);
      this.status.setValue(this.taskDetails.status);
      this.dueDate.setValue(this.taskDetails.dueDate);
    } else {
      this.taskForm.setValue(this.taskDetails);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFormSubmit():void {
   if(this.taskForm.valid) {
    if(this.taskDetails.id) {
      this.taskDetails.task = this.task.value;
      this.taskDetails.dueDate = this.dueDate.value;
      this.taskDetails.status = this.status.value;
    } else {
      this.taskDetails.task = this.task.value;
      this.taskDetails.dueDate = this.dueDate.value;
      this.taskDetails.status = 'not-started';
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
      const lengthOfCode = 10;
      this.taskDetails.id = this.makeRandomString(lengthOfCode, possible);
    }
    this.apiService.updatetaskList(this.taskDetails).subscribe(result => {
      //save API
      this.dialogRef.close();
      let dialogPopupRef = this.dialog.open(ExampleDialogComponent, {
        width: '500px',
        data: {status: 'updated'}
      });

      dialogPopupRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    },
    err => console.log(err),
    () => console.log('Completed'))
   } else {
    //fill all the values in form
   }
  }

  makeRandomString = (lengthOfCode: number, possible: string) => {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
