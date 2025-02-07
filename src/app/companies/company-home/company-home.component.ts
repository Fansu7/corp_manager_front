import { Component, OnInit } from '@angular/core';
import { ICompany } from 'src/app/models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDeleteComponent } from '../company-delete/company-delete.component';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css'],
})
export class CompanyHomeComponent implements OnInit {
  companies!: ICompany[];

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.companyService
      .getCompanies()
      .subscribe((data: ICompany[]) => (this.companies = data));
  }

  openDetailForm(row: ICompany) {
    this.router.navigate(['/companies', row.id]);
  }

  openDeleteDialog(companyId: number) {
    this.dialog.open(CompanyDeleteComponent, {
      data: { companyId: companyId },
    });
  }

  editCompanyDetail(companyId: number) {
    this.router.navigate(['/company/edit', companyId]);
  }
}
