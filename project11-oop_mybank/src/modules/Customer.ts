import { BankAccount } from "./BankAccount.js";

export class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: string;
  bankAccount: BankAccount;

  constructor(
    firstName: string = "",
    lastName: string = "",
    gender: string = "",
    age: number = 0,
    mobileNumber: string = "",
    bankAccount: BankAccount = new BankAccount()
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.bankAccount = bankAccount;
  }

  customerInfo(): string {
    return `Name: ${this.firstName} ${this.lastName}\nAge: ${this.age}\nGender: ${this.gender}\nMobile: ${this.mobileNumber}\nBank Account Balance: $${this.bankAccount.accountBalance}`;
  }
}
