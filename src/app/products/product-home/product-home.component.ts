import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
})
export class ProductHomeComponent {
  products!: IProduct[];

  constructor(
    private productService: ProductsService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((data: IProduct[]) => (this.products = data));
  }

  editProductDetail(productId: number) {
    this.router.navigate(['/product/edit', productId]);
  }

  openDetailForm(row: IProduct) {
    this.router.navigate(['/products', row.id]);
  }

  openDeleteDialog(productId: number): void {
    this.dialog.open(ProductDeleteComponent, {
      data: { productId: productId },
    });
  }
}
