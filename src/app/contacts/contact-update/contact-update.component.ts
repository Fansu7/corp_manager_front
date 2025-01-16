import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/contact';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css'],
})
export class ContactUpdateComponent implements OnInit {
  contact!: IContact;

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactsService
      .getContact(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.contact = data;
      });
  }

  updateContact(): void {
    this.contactsService.updateContact(this.contact).subscribe((data: any)=>{this.navigateToDetails()});
  }

  cancelChanges(): void {
    this.navigateToDetails();
  }

  private navigateToDetails(): void {
    this.router.navigate(['/contacts', this.route.snapshot.params['id']])
  }
}
