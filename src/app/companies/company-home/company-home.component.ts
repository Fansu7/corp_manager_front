import { Component, OnInit } from '@angular/core';
import { ICompany } from 'src/app/models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css'],
})
export class CompanyHomeComponent implements OnInit {
  openDetailForm(_t86: any) {
    throw new Error('Method not implemented.');
  }
  openDeleteDialog(arg0: any) {
    throw new Error('Method not implemented.');
  }
  editContactDetail(arg0: any) {
    throw new Error('Method not implemented.');
  }

  companies!: ICompany[];

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.companyService
      .getCompanies()
      .subscribe((data: ICompany[]) => (this.companies = data));
  }
}
