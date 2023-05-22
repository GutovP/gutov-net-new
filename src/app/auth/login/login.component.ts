import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { ToastService } from '../../core/toast/toast.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name: string = '';
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private router: Router,
    private cookie: CookieService) { }

  ngOnInit(): void {
  }

  loginHandler() {
    if (this.loginForm.invalid) { return; }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      (data) => {
        if (data == '') {

          return this.toastService.activate('Invalid Email or Password');
        }
        this.name = data.map((user: { username: string }) => {

          return user.username;
        });

        this.toastService.activate(` successfully logged as ${this.name}`);
        this.router.navigate(['/users']);
      }
    );
  }
}
