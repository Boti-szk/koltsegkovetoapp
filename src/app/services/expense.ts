import { Injectable } from '@angular/core';
import { Expense } from '../shared/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private db!: IDBDatabase;
  private readonly objectStoreName = 'expenses';
  public readonly expenses: Expense[] = [];

  constructor() {
    this.initIndexedDB();
  }

  public getAll(): Expense[] {
    return this.expenses;
  }

  public add(input: { title: string; type: 'Bevétel' | 'Kiadás'; amount: number; description?: string; date?: string }): boolean {
    const expense: Omit<Expense, 'id'> = {
      title: input.title,
      type: input.type,
      amount: input.amount,
      description: input.description ?? '',
      date: input.date ?? new Date().toISOString(),
    };

    const objectStore = this.db.transaction(this.objectStoreName, 'readwrite').objectStore(this.objectStoreName);
    const request = objectStore.add(expense);

    request.onsuccess = (event: any) => {
      const newExpense: Expense = {
        ...expense,
        id: event.target.result,
      };

      this.expenses.push(newExpense);
    };

    request.onerror = (event: any) => {
      console.log('Error adding item:', event.target.error);
    };

    return true;
  }

  public delete(id: number): void {
    const objectStore = this.db.transaction(this.objectStoreName, 'readwrite').objectStore(this.objectStoreName);
    const request = objectStore.delete(id);

    request.onsuccess = () => {
      const index = this.expenses.findIndex((e) => e.id === id);
      
      if (index !== -1){
        this.expenses.splice(index, 1);
      }
    };

    request.onerror = (event: any) => {
      console.log('Error deleting item:', event.target.error);
    };
  }

  private initIndexedDB() {
    const request = indexedDB.open('ExpenseDB', 1);

    request.onerror = (event: any) => {
      console.log('Database error:', event.target.error);
    }

    request.onupgradeneeded = (event: any) => {
      const db: IDBDatabase = event.target.result;

      const objectStore = db.createObjectStore(this.objectStoreName, { keyPath: 'id', autoIncrement: true});

      objectStore.createIndex('title', 'title', { unique: false });
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      this.loadExpenses();
    };
  }

    private loadExpenses(): void {
      const objectStore = this.db.transaction(this.objectStoreName).objectStore(this.objectStoreName);

      this.expenses.length = 0;

      objectStore.openCursor().onsuccess = (event: any) => {
        const cursor = event.target.result;

        if (cursor) {
          this.expenses.push(cursor.value as Expense);
          cursor.continue();
        }
      };
    }
}