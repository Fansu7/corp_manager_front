import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/contact';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

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
  };

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  newContact(): void {
    this.contactsService.newContact(this.contact).subscribe((data: any) => {
      this.router.navigate(['contacts']);
    });
  }

  cancelInsert(): void {
    this.router.navigate(['contacts']);
  }
}
