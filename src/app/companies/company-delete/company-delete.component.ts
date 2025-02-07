import { Component, Inject } from '@angular/core';
import { CompanyService } from '../company.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-delete',
  templateUrl: './company-delete.component.html',
  styleUrls: ['./company-delete.component.css'],
})
export class CompanyDeleteComponent {
  companyId!: number;
  constructor(
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<CompanyDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { companyId: number },
    private router: Router
  ) {
    this.companyId = data.companyId;
  }

  confirm(): void {
    this.companyService.deleteCompany(this.companyId).subscribe((data) => {
      this.dialogRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['companies']);
      });
    });
  }
}
