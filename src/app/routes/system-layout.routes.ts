import { Routes } from '@angular/router';

export const SYSTEM_ROUTES: Routes = [
    {
        path: 'usuario',
        loadChildren: () => import('../components/system/usuario/usuario.module').then(m => m.UsuarioModule)
    },

    {
        path: 'administrador',
        loadChildren: () => import('../components/system/administrador/administrador.module').then(m => m.AdministradorModule)
    },
 
 
];

