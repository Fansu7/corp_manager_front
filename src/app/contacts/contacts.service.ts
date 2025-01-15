import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<IContact[]>{
    const url = 'http://localhost:30030/contacts/getAll';
    return this.http.get<IContact[]>(url);
  }
}
