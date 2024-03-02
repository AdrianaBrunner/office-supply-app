import { Routes } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';

export const routes: Routes = [
  { path: '', redirectTo: '/administrador', pathMatch: 'full' },

//  { path: 'solicitante', loadChildren: () => import('./solicitante/solicitante.component').then(m => m.SolicitanteComponent) },
  { path: 'administrador', component: AdministradorComponent },

 // { path: 'almoxarife', loadChildren: () => import('./almoxarife/almoxarife.component').then(m => m.AlmoxarifeComponent) }
];

//import { Routes } from '@angular/router';

// export const routes: Routes = [
// ];
