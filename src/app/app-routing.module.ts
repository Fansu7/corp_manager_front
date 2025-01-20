import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactHomeComponent } from './contacts/contact-home/contact-home.component';
import { ContactNewComponent } from './contacts/contact-new/contact-new.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactUpdateComponent } from './contacts/contact-update/contact-update.component';
import { ProductHomeComponent } from './products/product-home/product-home.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';

const routes: Routes = [
  { path: 'contacts', component: ContactHomeComponent },
  { path: 'contact/new', component: ContactNewComponent },
  { path: 'contacts/:id', component: ContactDetailComponent },
  { path: 'contact/edit/:id', component: ContactUpdateComponent },
  { path: 'products', component: ProductHomeComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'product/edit/:id', component: ProductUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
