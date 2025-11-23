export interface Country {
    id: number,
    name: string,
    code: string,
    phoneCode: string
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