import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/contact';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICompany } from 'src/app/models/company';
import { FormControl } from '@angular/forms';
import { CompanyService } from 'src/app/companies/company.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css'],
})
export class ContactUpdateComponent implements OnInit {
  contact!: IContact;
  companies = new FormControl('');
  companiesList: ICompany[] = [];

  constructor(
    private contactsService: ContactsService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactsService
      .getContact(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.contact = data;
      });

    this.companyService.getCompanies().subscribe((data: any) => {
      this.companiesList = data.sort((a: any, b: any) =>
        a.name > b.name ? 1 : -1
      );
    });
  }

  updateContact(): void {
    this.contactsService.updateContact(this.contact).subscribe((data: any) => {
      this.navigateToDetails();
    });
  }

  cancelChanges(): void {
    this.navigateToDetails();
  }

  private navigateToDetails(): void {
    this.router.navigate(['/contacts', this.route.snapshot.params['id']]);
  }
}
