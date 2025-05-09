import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { IContact } from 'src/app/models/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css'],
})
export class ContactHomeComponent implements OnInit {
  contacts!: IContact[];

  constructor(
    private contactService: ContactsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.contactService
      .getContacts()
      .subscribe((data: IContact[]) => (this.contacts = data));
  }

  editContactDetail(contactId: number) {
    this.router.navigate(['/contact/edit', contactId]);
  }

  openDeleteDialog(contactId: number) {
    this.dialog.open(ContactDeleteComponent, {
      data: { contactId: contactId },
    });
  }

  openDetailForm(row: IContact) {
    this.router.navigate(['/contacts', row.id]);
  }
}
