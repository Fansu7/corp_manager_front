import { Component, Inject } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css'],
})
export class ContactDeleteComponent {
  contactId!: number;
  constructor(
    private contactsService: ContactsService,
    public dialogRef: MatDialogRef<ContactDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contactId: number },
    private router: Router
  ) {
    this.contactId = data.contactId;
  }

  confirm(): void {
    this.contactsService.deleteContact(this.contactId).subscribe((data) => {
      this.dialogRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['contacts']);
      });
    });
  }
}
