import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { SystemLayoutComponent } from './layout/system-layout/system-layout.component';
import { PAGES_ROUTES } from './routes/pages-layout.routes';
import { SYSTEM_ROUTES } from './routes/system-layout.routes';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', component: PagesLayoutComponent, data: { title: 'Contiene paginas libres de auth'}, children: PAGES_ROUTES },
    { path: '', component: SystemLayoutComponent, data: { title: 'Contiene paginas auth'}, children: SYSTEM_ROUTES },
    { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
