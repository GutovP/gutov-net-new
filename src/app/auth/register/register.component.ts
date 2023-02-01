import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { ToastService } from '../../core/toast/toast.service';
import { emailValidator, passwordGroupValidator } from '../../shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator()]],
    pass: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: [''],
    },
      {
        validators: [passwordGroupValidator('password', 'rePassword')],
      })

  })

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {

  }

  registerHandler() {
    if (this.registerForm.invalid) { return; }
    this.username = this.registerForm.get('username')?.value;
    const { username, email, pass: { password, rePassword } } = this.registerForm.value;
    this.authService.register(username, email, password, rePassword).subscribe(
      (data) => {
        this.toastService.activate(` successfully registred ${this.username}`);
        this.router.navigate(['/users']);
      }
    );
  }
}
