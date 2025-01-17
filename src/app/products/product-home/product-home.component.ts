import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
})
export class ProductHomeComponent {
  products!: IProduct[];

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((data: IProduct[]) => (this.products = data));
  }

  openDetailForm(row: IProduct) {
    this.router.navigate(['/products', row.id]);
  }
}
