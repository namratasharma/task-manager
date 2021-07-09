import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {AutheticationService} from '../services/authetication.service';
import { environment } from '../../environments/environment';
import {Task} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private router: Router,private http: HttpClient, private auth: AutheticationService) {}

  gettaskList(pageId:number) {
      //return this.http.get<any>(`${environment.apiUrl}/tasks`).pipe(map((res:any) => res.json)) //already contains json;
      const url = `${environment.apiUrl}/tasks?pageId=${pageId}`;
      const headers = new HttpHeaders({
          Authorization: "Basic " + btoa("user:secret123")
        });
      let userValue:any = this.auth.userValue ? this.auth.userValue : null;
      if((userValue && typeof userValue == 'object') || (userValue && typeof userValue == 'string')) {
          if(typeof userValue == 'string'){
            userValue = JSON.parse(userValue);
          }
          const params = new HttpParams().set('userId', userValue.id).set('userRole', userValue.role);
          return this.http.get<Task[]>(url, { headers, params});
      } else {
        return this.http.get<Task[]>(url, { headers});
      }
  }

  updatetaskList(task: Task) {
    //return this.http.get<any>(`${environment.apiUrl}/tasks`).pipe(map((res:any) => res.json)) //already contains json;
    const url = `${environment.apiUrl}/tasks`;
    const headers = new HttpHeaders({
        Authorization: "Basic " + btoa("user:secret123")
      });
    return this.http.patch<Task[]>(url, { headers });
  }

  updatetaskStatus(id: string, status: string) {
    //return this.http.get<any>(`${environment.apiUrl}/tasks`).pipe(map((res:any) => res.json)) //already contains json;
    const url = `${environment.apiUrl}/tasks/${id}`;
    const params = new HttpParams().set('status', status);
    const headers = new HttpHeaders({
        Authorization: "Basic " + btoa("user:secret123")
      });
    return this.http.put<number>(url, headers, { params });
  }
}
