import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ICompany } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getCompanies() {
    const url = 'http://localhost:30030/companies/getAll';
    return this.http.get<ICompany[]>(url);
  }
}
