import { BankAccount } from "./BankAccount.js";
export class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    bankAccount;
    constructor(firstName = "", lastName = "", gender = "", age = 0, mobileNumber = "", bankAccount = new BankAccount()) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.bankAccount = bankAccount;
    }
    customerInfo() {
        return `Name: ${this.firstName} ${this.lastName}\nAge: ${this.age}\nGender: ${this.gender}\nMobile: ${this.mobileNumber}\nBank Account Balance: $${this.bankAccount.accountBalance}`;
    }
}
