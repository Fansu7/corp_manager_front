import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]>{
    const url = 'http://localhost:30030/products/getAll';
    return this.http.get<IProduct[]>(url);
  }
}
