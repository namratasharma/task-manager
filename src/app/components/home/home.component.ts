import {Component, OnInit, Inject} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import { ApiServiceService } from '../../services';
import { MatDialog} from '@angular/material/dialog';
import {ExampleDialogComponent} from '../dialogs/example/example-dialog.component';
import {Task} from '../../models/task';
import { TaskDetailComponent } from '../dialogs/task-detail/task-detail.component';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  providers: [DatePipe],
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiServiceService, private datePipe: DatePipe, public dialog: MatDialog) {}
  displayedColumns: string[] = ['id', 'task', 'status', 'dueDate', 'markAsDone'];
  tasks: Task[] = [];
  dataSource:any;
  today: any = new Date().getTime();

  ngOnInit() {
    //this.dataSource.sort = this.sort;
    this.apiService.gettaskList(1).subscribe(result => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = result;
    },
    err => console.log(err),
    () => console.log('Completed'))
  }

  checkDueDate = (dataInRow: any) => {
    let classes = '';
    const dueDate = new Date(dataInRow.dueDate).getTime();
    if ( dueDate < this.today ) {
      classes = classes + ' disabled';
    }
    if(dataInRow.status == 'not-started') {
      classes = classes + ' danger';
    } else if(dataInRow.status == 'in-progress') {
      classes = classes + ' warning';
    } else {
      classes = classes + ' success';
    }
    return classes;
  }

  checkDueDateForDisabling = (dueDateFromRow: any) => {
    const dueDate = new Date(dueDateFromRow).getTime();
    if ( dueDate < this.today ) {
      return true;
    } else {
      return false;
    }
  }

  addNewTask = () => {
    let dialogRefNewTask = this.dialog.open(TaskDetailComponent, {
      width: '500px',
      data: {}
    });

    dialogRefNewTask.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  opentaskDetailDialog = (element: Task) => {
    let dialogRefUpdateTask = this.dialog.open(TaskDetailComponent, {
      width: '500px',
      data: element
    });

    dialogRefUpdateTask.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  updateStatusOfTask = (id: string, status: string) => {
    this.apiService.updatetaskStatus(id, status).subscribe(result => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = result;
      let dialogRef = this.dialog.open(ExampleDialogComponent, {
        width: '500px',
        data: {status: (status == 'done' ? 'completed' : 'started')}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    },
    err => console.log(err),
    () => console.log('Completed'))
  }

  getDetailOfTask = () => {
    console.log('add New Task');
  }

  checkStatus = (status:string) => {
    if ( status == "done" ) {
      return true;
    } else {
      return false;
    }
  }

  checkStatusIfEnabled = (el:Task) => {
    if(!this.checkDueDateForDisabling(el.dueDate) && el.status == "in-progress"){
        return true;
      } else {
        return false;
      }
  }
}
