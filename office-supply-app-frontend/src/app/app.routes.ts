import { Routes } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';
import { SolicitanteComponent } from './solicitante/solicitante.component';
import { AlmoxarifeComponent } from './almoxarife/almoxarife.component';

export const routes: Routes = [
  { path: '', redirectTo: '/solicitante', pathMatch: 'full' },

  { path: 'solicitante', component: SolicitanteComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'almoxarife', component: AlmoxarifeComponent }
];

