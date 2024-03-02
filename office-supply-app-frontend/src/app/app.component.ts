import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';
import { SolicitanteComponent } from './solicitante/solicitante.component';
import { AlmoxarifeComponent } from './almoxarife/almoxarife.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, 
    AdministradorComponent, SolicitanteComponent, AlmoxarifeComponent, HeaderComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'office-supply-app-frontend';
}
