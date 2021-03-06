import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from './services/authetication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  user:any = null;
  constructor(
    private router: Router,
    private authenticationService: AutheticationService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.userValue) {
          if(typeof this.authenticationService.userValue == 'object') {
            this.user = this.authenticationService.userValue;
          } else {
            this.user = JSON.parse(this.authenticationService.userValue);
          }
      }
  }

  contact = () =>{
    this.router.navigate(['/contact']);
  }

  logout = () =>{
    this.authenticationService.logout();
  }
}
