import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product!: IProduct;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService
      .getProduct(this.route.snapshot.params['id'])
      .subscribe((data: IProduct) => (this.product = data));
  }

  editProduct() {
    this.router.navigate(['product/edit', this.route.snapshot.params['id']]);
  }

  closeProduct() {
    this.router.navigate(['products']);
  }

  openDeleteDialog(productId: number | undefined) {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: { productId: productId },
    });
  }
}
