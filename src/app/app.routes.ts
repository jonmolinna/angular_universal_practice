import { Routes } from '@angular/router';
import { AuthPage } from './pages/auth/auth-page/auth-page';

export const routes: Routes = [
    {
        path: 'login',
        component: AuthPage,
    }
];
