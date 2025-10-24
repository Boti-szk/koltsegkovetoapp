import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registration } from './components/registration/registration';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'registration',
        component: Registration
    },
    {
        path: 'expenses',
        loadComponent: () => import("./components/expenses/expenses").then(c => c.Expenses),
    },
    {
        path: 'addexpenses',
        loadComponent: () => import("./components/add-expenses/add-expenses").then(c => c.AddExpenses),
    },
    {
        path: 'profile',
        loadComponent: () => import("./components/profile/profile").then(c => c.Profile),
    },
    {
        path: '**', redirectTo: 'login'
    }
];
