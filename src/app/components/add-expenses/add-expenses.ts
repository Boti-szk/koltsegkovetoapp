import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-add-expenses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './add-expenses.html',
  styleUrl: './add-expenses.scss'
})
export class AddExpenses {
  expenseForm: FormGroup;

  constructor(private fb: FormBuilder, private svc: ExpenseService, private router: Router) {
    this.expenseForm = this.fb.group({
      title: [''],
      type: ['Kiadás'],
      amount: [''],
      description: ['']
    });
  }

  onSubmit(): void {
    if (!this.expenseForm.value.title || this.expenseForm.value.amount === '') return;

    const { title, type, amount, description } = this.expenseForm.value;
    this.svc.add({title, type, amount: Number(amount), description});

    this.expenseForm.reset({ title: '', type: 'Kiadás', amount: '', description: '' });
    this.router.navigateByUrl('/expenses');
  }
}
