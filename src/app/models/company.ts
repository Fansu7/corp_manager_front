import { IContact } from './contact';

export interface ICompany {
  id?: number;
  name: string;
  country: string;
  city: string;
  website: string;
  contacts: IContact[];
}
