import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const baseUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendMessage(name: string, email: string, subject: string, message: string) {
    return this.http.post<any>(`${baseUrl}/contact`, { name, email, subject, message });
  }
}
