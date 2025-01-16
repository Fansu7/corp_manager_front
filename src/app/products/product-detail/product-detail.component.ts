import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product!: IProduct;

  constructor(private productService: ProductsService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.productService.getProduct(this.route.snapshot.params['id']).subscribe((data:IProduct) => (this.product = data))
  }

}
