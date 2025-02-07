import { Component } from '@angular/core';
import { ICompany } from 'src/app/models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDeleteComponent } from '../company-delete/company-delete.component';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
})
export class CompanyDetailComponent {
  company!: ICompany;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.companyService
      .getCompany(this.route.snapshot.params['id'])
      .subscribe((data: ICompany) => (this.company = data));
  }

  closeCompany() {
    this.router.navigate(['/companies']);
  }

  editCompany() {
    this.router.navigate(['/company/edit', this.route.snapshot.params['id']]);
  }

  openDeleteDialog(companyId: number | undefined) {
    const dialogRef = this.dialog.open(CompanyDeleteComponent, {
      data: { comapnyId: companyId },
    });
  }
}
