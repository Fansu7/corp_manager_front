import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactHomeComponent } from './contacts/contact-home/contact-home.component';
import { ProductHomeComponent } from './products/product-home/product-home.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

const routes: Routes = [
  { path: 'contacts', component: ContactHomeComponent },
  { path: 'contacts/:id', component: ContactDetailComponent },
  { path: 'products', component: ProductHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
