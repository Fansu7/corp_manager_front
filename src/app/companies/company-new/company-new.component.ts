import { Component } from '@angular/core';
import { ICompany } from 'src/app/models/company';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-new',
  templateUrl: './company-new.component.html',
  styleUrls: ['./company-new.component.css'],
})
export class CompanyNewComponent {
  company: ICompany = {
    name: '',
    country: '',
    city: '',
    website: '',
    contacts: [],
  };

  constructor(private companyService: CompanyService, private router: Router) {}

  newCompany(): void {
    this.companyService.newCompany(this.company).subscribe((data: any) => {
      this.router.navigate(['companies']);
    });
  }

  cancelInsert(): void {
    this.router.navigate(['companies']);
  }
}
