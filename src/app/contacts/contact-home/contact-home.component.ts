import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { IContact } from 'src/app/models/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css'],
})
export class ContactHomeComponent implements OnInit {
  contacts!: IContact[];

  constructor(
    private contactService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactService
      .getContacts()
      .subscribe((data: IContact[]) => (this.contacts = data));
  }

  openDetailForm(row: any) {
    this.router.navigate(['/contacts', row.id]);
  }
}
