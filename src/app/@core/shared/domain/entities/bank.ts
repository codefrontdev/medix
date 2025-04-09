export class Bank {
    public readonly accountName?: string;
    public readonly accountNumber?: string;
    public readonly bankName?: string | null; // Make this optional
    public readonly iban?: string;
  
    constructor(accountName?: string, accountNumber?: string, bankName?: string | null, iban?: string) {
      this.accountName = accountName;
      this.accountNumber = accountNumber;
      this.bankName = bankName;
      this.iban = iban;
    }
  }
  