import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts/contacts.service';
import { IContact } from '../models/contact';
import { IProduct } from '../models/product';
import { ProductsService } from '../products/products.service';
import { CompanyService } from '../companies/company.service';
import { ICompany } from '../models/company';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  initialLetter: any[] = [];
  initialLetterP: any[] = [];
  companyContacts: any[] = [];
  companiesBySector: any;
  companiesCityData!: [];
  contactsByFullName: any;
  productsByFullName: any;
  emailExtensions: any;
  companiesByCountry: any;
  phonePrefixData!: [];
  productsAvailability: any;
  productsStock: any;
  productsPrices: any;

  constructor(
    private contactsService: ContactsService,
    private productsService: ProductsService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((contacts: IContact[]) => {
      this.initialLetter = this.calculateInitialLettersData(contacts);
      this.contactsByFullName = this.calculateContactsByFullName(contacts);
      this.emailExtensions = this.calculateEmailExtensionsData(contacts);
      this.phonePrefixData = this.generatePhonePrefixData(contacts);
      this.companyContacts = this.calculateContactsByCompany(contacts);
    });
    this.productsService.getProducts().subscribe((products: IProduct[]) => {
      this.initialLetterP = this.calculateInitialLettersDataP(products);
      this.productsByFullName = this.calculateProductsByFullName(products);
      this.productsAvailability = this.calculateProductsAvailability(products);
      this.productsStock = this.calculateProductsStock(products);
      this.productsPrices = this.calculateProductsPrice(products);
    });
    this.companyService.getCompanies().subscribe((companies: ICompany[]) => {
      this.companiesByCountry = this.calculateCompaniesCountry(companies);
      this.companiesBySector = this.calculateCompaniesSector(companies);
      this.companiesCityData = this.calculateCompaniesCity(companies);
    });
  }

  calculateCompaniesSector(companies: ICompany[]): any {
    const tempCompaniesBySector: { name: string; series: any[] }[] = [
      { name: 'Sector', series: [] },
    ];

    companies.forEach((company) => {
      const existingSector = tempCompaniesBySector[0].series.find(
        (item) => item.name === company.sector
      );
      if (existingSector) {
        existingSector.value++;
      } else {
        tempCompaniesBySector[0].series.push({
          name: company.sector,
          value: 1,
        });
      }
    });

    return tempCompaniesBySector;
  }

  calculateCompaniesCity(companies: ICompany[]): any {
    const companyCityData: any = [];
    const cityCounts: any = {};
    companies.forEach((company: ICompany) => {
      if (cityCounts[company.city]) {
        cityCounts[company.city]++;
      } else {
        cityCounts[company.city] = 1;
      }
    });

    for (const city in cityCounts) {
      if (cityCounts.hasOwnProperty(city)) {
        companyCityData.push({ name: city, value: cityCounts[city] });
      }
    }
    return companyCityData;
  }

  calculateCompaniesCountry(companies: ICompany[]): any {
    const countryMap: Map<string, number> = new Map<string, number>();
    companies.forEach((company) => {
      if (countryMap.has(company.country)) {
        countryMap.set(
          company.country,
          (countryMap.get(company.country) ?? 0) + 1
        );
      } else {
        countryMap.set(company.country, 1);
      }
    });

    const countries: any = [];
    countryMap.forEach((value: number, key: string) => {
      countries.push({ name: key, value: value });
    });

    return countries;
  }

  calculateContactsByCompany(contacts: IContact[]): any {
    const companyMap = new Map<string, number>();

    contacts.forEach((contact) => {
      const companyName = contact.companyName;

      if (companyMap.has(companyName)) {
        companyMap.set(companyName, companyMap.get(companyName)! + 1);
      } else {
        companyMap.set(companyName, 1);
      }
    });

    const tempContactsByCompany = Array.from(companyMap, ([name, value]) => ({
      name,
      value,
    }));
    return tempContactsByCompany;
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

  calculateProductsByFullName(products: IProduct[]): any {
    const tempProductsByFullName: { name: string; series: any[] }[] = [
      { name: 'Products', series: [] },
    ];

    products.forEach((product) => {
      const size = product.name.length;
      const range = `${size - (size % 5)}-${size - (size % 5) + 4} ch.`;

      const existingRange = tempProductsByFullName[0].series.find(
        (item) => item.name === range
      );
      if (existingRange) {
        existingRange.value++;
      } else {
        tempProductsByFullName[0].series.push({ name: range, value: 1 });
      }
    });

    return tempProductsByFullName.map((entry) => {
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

  calculateInitialLettersDataP(products: IProduct[]): IProduct[] {
    return products.reduce((result: any, product: IProduct) => {
      const initial = product.name.charAt(0).toUpperCase();
      if (result.find((item: IProduct) => item.name === initial)) {
        result.find((item: IProduct) => item.name === initial).value++;
      } else {
        result.push({ name: initial, value: 1 });
      }
      return result.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
    }, []);
  }

  calculateProductsAvailability(products: IProduct[]) {
    const availableMap: Map<string, number> = new Map<string, number>();
    products.forEach((product) => {
      const productAvailable = product.active ? 'Available' : 'Not available';
      if (availableMap.has(productAvailable)) {
        availableMap.set(
          productAvailable,
          (availableMap.get(productAvailable) ?? 0) + 1
        );
      } else {
        availableMap.set(productAvailable, 1);
      }
    });

    const availableProducts: any = [];
    availableMap.forEach((value: number, key: string) => {
      availableProducts.push({ name: key, value: value });
    });
    return availableProducts;
  }

  calculateProductsPrice(products: IProduct[]): IProduct[] {
    const pricesArray: any = [];
    products.forEach((product) => {
      pricesArray.push({
        name: product.name,
        value: Math.round(product.price),
      });
    });
    return pricesArray.sort((a: any, b: any) => (a.value > b.value ? 1 : -1));
  }

  calculateProductsStock(products: IProduct[]) {
    const stockArray: any = [];
    products.forEach((product) => {
      stockArray.push({ name: product.name, value: product.stock });
    });
    return stockArray.sort((a: any, b: any) => (a.value < b.value ? 1 : -1));
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
