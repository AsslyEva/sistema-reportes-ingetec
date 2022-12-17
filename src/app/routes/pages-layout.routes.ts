import { Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
    {
        path: 'login',
        loadChildren: () => import('../components/pages/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'error',
        loadChildren: () => import('../components/pages/error/error.module').then(m => m.ErrorModule)
    }
];