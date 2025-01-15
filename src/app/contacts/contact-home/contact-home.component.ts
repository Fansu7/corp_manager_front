import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { IContact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})
export class ContactHomeComponent implements OnInit {
  contacts!: IContact[];

  constructor(private contactService: ContactsService){}

  ngOnInit(): void {
    this.contactService
    .getContacts()
    .subscribe((data: IContact[]) => (this.contacts = data));
  }
}
