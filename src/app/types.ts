export interface Discipleship {
    id: string;
    name: string;
    month: number;
    monthName: string;
    year: number;
    deadline: string;
    country: Country | null
    venue: string | null,
    online: boolean,
    link: string | null
    photo: File | null,
    members?: Member[]
}

export interface File {
  id: number;
  url: string,
  mimeType: string;
  filename: string;
  extension: string;
  size: number;
}
  
export interface Member {
      id: string;
      firstname: string;
      surname: string;
      email: string;
      phoneNumber: string;
      country: Country | null
  }
  
export interface Country {
      id: number;
      name: string;
      code: string;
      phoneCode: string;
}

export interface Bank {
  id: number,
  name: string
}

export interface BankAccount {
  id: number,
  type: string,
  currency?: string,
  bank?: Bank,
  name: string,
  number: string,
  swift_bic?: string,
  country?: Country
}

export interface OnlineAccount {
  id: number,
  name: string,
  url: string,
  qrCodePhoto: string
}