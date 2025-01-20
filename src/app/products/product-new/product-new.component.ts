import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
})
export class ProductNewComponent {
  product: IProduct = {
    name: '',
    stock: 0,
    price: 0,
    active: false,
    date_added: new Date(),
  };

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  newProduct(): void {
    this.productsService.newProduct(this.product).subscribe((data: any) => {
      this.router.navigate(['products']);
    });
  }

  cancelInsert(): void {
    this.router.navigate(['products']);
  }
}
