import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactHomeComponent } from './contacts/contact-home/contact-home.component';
import { ContactDeleteComponent } from './contacts/contact-delete/contact-delete.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactNewComponent } from './contacts/contact-new/contact-new.component';
import { ContactUpdateComponent } from './contacts/contact-update/contact-update.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductHomeComponent } from './products/product-home/product-home.component';
import { ProductNewComponent } from './products/product-new/product-new.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';
import { ProductDeleteComponent } from './products/product-delete/product-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactHomeComponent,
    ContactDetailComponent,
    ProductHomeComponent,
    ProductDetailComponent,
    ContactUpdateComponent,
    ProductUpdateComponent,
    ContactNewComponent,
    ProductNewComponent,
    ContactDeleteComponent,
    ProductDeleteComponent,
  ],
  entryComponents: [ContactDeleteComponent, ProductDeleteComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
