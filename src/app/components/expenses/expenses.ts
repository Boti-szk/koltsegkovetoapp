import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Expense } from '../../shared/expense';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports:[
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './expenses.html',
  styleUrls: ['./expenses.scss']
})
export class Expenses {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenses = this.expenseService.getAll();
  }
}
