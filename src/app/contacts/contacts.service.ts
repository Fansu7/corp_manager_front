import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getContact(c_id:number): Observable<IContact>{
    const url = 'http://localhost:30030/contacts/get';
    const headers = new HttpHeaders().set('Content-Type','application/json');
    const body = JSON.stringify({id: c_id});
    return this.http.post<IContact>(url, body, { headers });
  }

  updateContact(contact: IContact): Observable<any> {
    const url = 'http://localhost:30030/contacts/update';
    const body = contact;
    const headers = new HttpHeaders();
    return this.http.put(url, body, { headers });
  }
}
