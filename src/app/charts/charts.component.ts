import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts/contacts.service';
import { IContact } from '../models/contact';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  initialLetter: any[] = [];
  contactsByFullName: any;
  emailExtensions: any;
  phonePrefixData!: [];

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((contacts: IContact[]) => {
      this.initialLetter = this.calculateInitialLettersData(contacts);
      this.contactsByFullName = this.calculateContactsByFullName(contacts);
      this.emailExtensions = this.calculateEmailExtensionsData(contacts);
      this.phonePrefixData = this.generatePhonePrefixData(contacts);
    });
  }

  calculateContactsByFullName(contacts: IContact[]): any {
    const tempContactsByFullName: { name: string; series: any[] }[] = [
      { name: 'Contacts', series: [] },
    ];

    contacts.forEach((contact) => {
      const fullName = contact.name + contact.surname + contact.lastName;
      const size = fullName.length;
      const range = `${size - (size % 5)}-${size - (size % 5) + 4} ch.`;

      const existingRange = tempContactsByFullName[0].series.find(
        (item) => item.name === range
      );
      if (existingRange) {
        existingRange.value++;
      } else {
        tempContactsByFullName[0].series.push({ name: range, value: 1 });
      }
    });

    return tempContactsByFullName.map((entry) => {
      return {
        ...entry,
        series: entry.series.sort(
          (a, b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0])
        ),
      };
    });
  }

  calculateEmailExtensionsData(contacts: IContact[]) {
    const emailExtensionsMap: Map<string, number> = new Map<string, number>();
    contacts.forEach((contact) => {
      const emailParts = contact.email.split('@');
      if (emailParts.length === 2) {
        const domain = emailParts[1];
        const firstDotIndex = domain.indexOf('.');
        if (firstDotIndex !== -1) {
          const extension = domain.substring(firstDotIndex);
          if (emailExtensionsMap.has(extension)) {
            emailExtensionsMap.set(
              extension,
              (emailExtensionsMap.get(extension) ?? 0) + 1
            );
          } else {
            emailExtensionsMap.set(extension, 1);
          }
        }
      }
    });

    const emailExtensions: any = [];
    emailExtensionsMap.forEach((value: number, key: string) => {
      emailExtensions.push({ name: key, value: value });
    });
    return emailExtensions;
  }

  calculateInitialLettersData(contacts: IContact[]): IContact[] {
    return contacts.reduce((result: any, contact: IContact) => {
      const initial = contact.surname.charAt(0).toUpperCase();
      if (result.find((item: IContact) => item.name === initial)) {
        result.find((item: IContact) => item.name === initial).value++;
      } else {
        result.push({ name: initial, value: 1 });
      }
      return result.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
    }, []);
  }

  generatePhonePrefixData(contacts: IContact[]) {
    const phonePrefixData: any = [];
    const prefixCounts: any = {};
    contacts.forEach((contact: IContact) => {
      const phonePrefix = contact.telephone.substring(0, 3);
      if (prefixCounts[phonePrefix]) {
        prefixCounts[phonePrefix]++;
      } else {
        prefixCounts[phonePrefix] = 1;
      }
    });

    for (const prefix in prefixCounts) {
      if (prefixCounts.hasOwnProperty(prefix)) {
        phonePrefixData.push({ name: prefix, value: prefixCounts[prefix] });
      }
    }
    return phonePrefixData;
  }

  formatAxisTick(value: number): string {
    return Math.floor(value).toString();
  }
}
