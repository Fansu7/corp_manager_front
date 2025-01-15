import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent {
  products!: IProduct[];

  constructor(private productService: ProductsService){}

    ngOnInit(): void {
      this.productService
      .getProducts()
      .subscribe((data: IProduct[]) => (this.products = data));
    }
}
