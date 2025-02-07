import { Component, OnInit } from '@angular/core';
import { ICompany } from 'src/app/models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css'],
})
export class CompanyUpdateComponent implements OnInit {
  company!: ICompany;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyService
      .getCompany(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.company = data;
      });
  }

  updateCompany(): void {
    this.companyService.updateCompany(this.company).subscribe((data: any) => {
      this.navigateToDetails();
    });
  }

  cancelChanges(): void {
    this.navigateToDetails();
  }

  private navigateToDetails(): void {
    this.router.navigate(['companies', this.route.snapshot.params['id']]);
  }
}
