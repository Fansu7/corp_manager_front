import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getProduct(p_id:number): Observable<IProduct>{
    const url = 'http://localhost:30030/products/get';
    const headers = new HttpHeaders().set('Content-Type','application/json');
    const body = JSON.stringify({id: p_id});
    return this.http.post<IProduct>(url, body, { headers });
  }

  updateProduct(product: IProduct): Observable<any> {
    const url = 'http://localhost:30030/products/update';
    const body = product;
    const headers = new HttpHeaders();
    return this.http.put(url, body, { headers });
  }
}
