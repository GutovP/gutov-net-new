import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ContactService } from './contact.service';
import { ToastService } from '../core/toast/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  })

  constructor(private contactService: ContactService, private fb: FormBuilder, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  messageHandler(): void {
    if (this.contactForm.invalid) { return; }

    const { name, email, subject, message } = this.contactForm.value;
    this.contactService.sendMessage(name, email, subject, message).subscribe();

    if (this.contactForm.valid) {
      this.toastService.activate('Message sent successfully');
      this.contactForm.reset();
    }
  }
}
