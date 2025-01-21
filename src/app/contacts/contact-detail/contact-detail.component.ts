import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/contact';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact!: IContact;

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.contactsService
      .getContact(this.route.snapshot.params['id'])
      .subscribe((data: IContact) => (this.contact = data));
  }

  closeContact() {
    this.router.navigate(['/contacts']);
  }

  editContact() {
    this.router.navigate(['/contact/edit', this.route.snapshot.params['id']]);
  }

  openDeleteDialog(contactId: number | undefined) {
    const dialogRef = this.dialog.open(ContactDeleteComponent, {
      data: { contactId: contactId },
    });
  }
}
