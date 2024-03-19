export interface IBankAccount {
  debit(amount: number): string;
  credit(amount: number): string;
}
