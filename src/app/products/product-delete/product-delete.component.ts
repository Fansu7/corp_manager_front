import { Component, Inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent {
  productId!: number;

  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number },
    private router: Router
  ) {
    this.productId = data.productId;
  }

  confirm(): void {
    this.productsService.deleteProduct(this.productId).subscribe((data) => {
      this.dialogRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['products']);
      });
    });
  }
}
