import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactHomeComponent } from './contacts/contact-home/contact-home.component';

const routes: Routes = [{path: 'contacts', component: ContactHomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
