import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import {Task} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private router: Router,private http: HttpClient) {}

  gettaskList(pageId:number) {
      //return this.http.get<any>(`${environment.apiUrl}/tasks`).pipe(map((res:any) => res.json)) //already contains json;
      const url = `${environment.apiUrl}/tasks?pageId=${pageId}`;
      const headers = new HttpHeaders({
          Authorization: "Basic " + btoa("user:secret123")
        });
      return this.http.get<Task[]>(url, { headers });
  }
}
