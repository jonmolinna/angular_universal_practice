import { Routes } from '@angular/router';
import { AuthPage } from './pages/auth/auth-page/auth-page';
import { RegisterPage } from './pages/register/register-page/register-page';
import { AnimacionPage } from './pages/animacion/animacion-page/animacion-page';

export const routes: Routes = [
    {
        path: 'login',
        component: AuthPage,
    },
    {
        path: 'register',
        component: RegisterPage
    },
    {
        path: 'animacion',
        component: AnimacionPage
    }
];
