import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AutheticationService } from '../../services/authetication.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AutheticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.userValue) {
            this.router.navigate(['/home']);
        }
    }

    loginForm = this.formBuilder.group({});
    loading = false;
    submitted = false;
    error = '';


    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}

