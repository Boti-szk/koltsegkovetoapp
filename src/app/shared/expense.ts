export interface Expense {
  id: number;
  title: string;
  type: 'Bevétel' | 'Kiadás';
  date: string;
  amount: number;
  description: string;
}
