import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ICompany } from '../models/company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getCompanies() {
    const url = 'http://localhost:30030/companies/getAll';
    return this.http.get<ICompany[]>(url);
  }

  getCompany(comp_id: number): Observable<ICompany> {
    const url = 'http://localhost:30030/companies/get';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ id: comp_id });
    return this.http.post<ICompany>(url, body, { headers });
  }

  updateCompany(company: ICompany): Observable<any> {
    const url = 'http://localhost:30030/companies/update';
    const body = company;
    const headers = new HttpHeaders();
    return this.http.put(url, body, { headers });
  }

  newCompany(company: ICompany): Observable<any> {
    const url = 'http://localhost:30030/companies/add';
    const body = company;
    const headers = new HttpHeaders();
    return this.http.post(url, body, { headers });
  }

  deleteCompany(id: number): Observable<any> {
    const url = 'http://localhost:30030/companies/delete';
    const body = { id: id };
    const options = { body, header: new HttpHeaders() };
    return this.http.delete(url, options);
  }
}
