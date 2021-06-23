import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './models';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'contact',
      component: ContactComponent,
      canActivate: [AuthGuard],
      data: { roles: [Role.User] }
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
