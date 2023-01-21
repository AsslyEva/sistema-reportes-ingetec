import { Routes } from '@angular/router';
import { AuthGuard } from '../service/auth/auth.guard';
import { AdminGuard } from '../service/auth/admin.guard';

export const SYSTEM_ROUTES: Routes = [
    {
        path: 'usuario',
        loadChildren: () => import('../components/system/usuario/usuario.module').then(m => m.UsuarioModule),
        canActivate: [AuthGuard]
    },

    {
        path: 'administrador',
        loadChildren: () => import('../components/system/administrador/administrador.module').then(m => m.AdministradorModule),
        canActivate: [AdminGuard]
    },


];

