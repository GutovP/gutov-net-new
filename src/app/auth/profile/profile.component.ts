import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { emailValidator } from '../../shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  showEditMode = false;
  formSubmitted = false;
  profileForm!: FormGroup;

  get user() {
    const { id, username, email, password } = this.authService.user!;
    return { id, username, email, password };
  }
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm(this.user);
  }
  createForm(formValue: any) {
    this.profileForm = this.fb.group({
      username: [formValue.username, [Validators.required, Validators.minLength(5)]],
      email: [formValue.email, [Validators.required, emailValidator()]],
      password: [formValue.password, [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    return this.authService.getProfile().subscribe(
      (data) => {
        console.log(this.user);
        data = this.user;
      }
    )
  }
  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
    if (this.showEditMode) {
      this.formSubmitted = false;
    }
  }

  saveProfile(): void {
    // this.formSubmitted = true;
    // if (this.profileForm.invalid) {
    //   return;
    // }
    // const { username, email, password } = this.profileForm.value;
    // this.authService.setProfile(username, email, password).subscribe(() => {
    //   this.toggleEditMode();
    // })
  }
}
