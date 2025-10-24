import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

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
    MatRadioModule
  ],
  templateUrl: './add-expenses.html',
  styleUrl: './add-expenses.scss'
})
export class AddExpenses {
  expenseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      title: [''],
      type: [''],
      amount: [''],
      description: ['']
    });
  }
}
