import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/contact';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/companies/company.service';
import { ICompany } from 'src/app/models/company';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css'],
})
export class ContactNewComponent implements OnInit {
  contact: IContact = {
    name: '',
    surname: '',
    lastName: '',
    telephone: '',
    email: '',
    companyId: 0,
    companyName: '',
  };

  companies = new FormControl('');
  companiesList: ICompany[] = [];

  constructor(
    private contactsService: ContactsService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((data: any) => {
      this.companiesList = data.sort((a: any, b: any) =>
        a.name > b.name ? 1 : -1
      );
    });

    this.companies.valueChanges.subscribe((selectedId: any) => {
      if (selectedId) {
        const selectedCompany = this.companiesList.find(
          (company) => company.id === selectedId
        );
        this.contact.companyId = selectedId;
      } else {
        this.contact.companyId = 0;
      }
    });
  }

  newContact(): void {
    this.contactsService.newContact(this.contact).subscribe((data: any) => {
      this.router.navigate(['contacts']);
    });
  }

  cancelInsert(): void {
    this.router.navigate(['contacts']);
  }
}
