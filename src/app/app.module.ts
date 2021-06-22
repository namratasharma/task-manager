import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// used to create fake backend

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//import { ErrorInterceptor } from './_helpers';
import { HomeComponent } from './components/home/home.component';
import { DialogModule } from './components/dialogs/dialog.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatDialogModule,
        MatSlideToggleModule,
        DialogModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    // providers: [
    //     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    // ],
    bootstrap: [AppComponent]
})

export class AppModule { }
