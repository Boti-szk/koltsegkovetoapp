import { Injectable } from '@angular/core';
import { Expense } from '../shared/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
 private expenses: Expense[] = [
    {
      id: 1,
      title: 'Fizetés',
      type: 'Bevétel',
      date: '2025-10-01',
      amount: 450000,
      description: 'Havi nettó fizetés'
    },
    {
      id: 2,
      title: 'Bevásárlás',
      type: 'Kiadás',
      date: '2025-10-05',
      amount: 23000,
      description: 'Heti nagybevásárlás a szupermarketben'
    },
    {
      id: 3,
      title: 'Netflix előfizetés',
      type: 'Kiadás',
      date: '2025-10-08',
      amount: 3990,
      description: 'Havi előfizetés díja'
    }
  ];

  getAll(): Expense[] {
    return [...this.expenses];
  }
}