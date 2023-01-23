import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { User } from 'src/app/core/models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User | undefined;
  registerForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    password: ['']
  })

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  registerHandler() {
    const { firstName, lastName, email, password } = this.registerForm.value;
    this.authService.register(firstName, lastName, email, password).subscribe(
      (data) => {
        this.user = data;
      }
    )
  }
}
