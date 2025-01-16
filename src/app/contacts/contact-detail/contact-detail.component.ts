import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/contact';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact!:IContact;

  constructor(private contactsService: ContactsService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.contactsService.getContact(this.route.snapshot.params['id']).subscribe( (data:IContact) => (this.contact = data) );
  }
}
