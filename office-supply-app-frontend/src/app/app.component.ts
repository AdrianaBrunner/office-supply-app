import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';
import { SolicitanteComponent } from './solicitante/solicitante.component';
import { AlmoxarifeComponent } from './almoxarife/almoxarife.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, 
    AdministradorComponent, SolicitanteComponent, AlmoxarifeComponent, 
    MatToolbarModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'office-supply-app-frontend';
}
