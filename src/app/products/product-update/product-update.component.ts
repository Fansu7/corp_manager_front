import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit{

product!: IProduct;

constructor(
  private productsService: ProductsService,
  private route: ActivatedRoute,
  private router: Router
){}

ngOnInit(): void {
  this.productsService
  .getProduct(this.route.snapshot.params['id'])
  .subscribe((data)=> {
    this.product = data;
  });
}

updateProduct(): void {
  this.productsService.updateProduct(this.product).subscribe((data: any) =>{this.navigateToDetails()});
}

cancelChanges(): void {
  this.navigateToDetails();
}

private navigateToDetails(): void {
  this.router.navigate(['/products', this.route.snapshot.params['id']]);
}
}
