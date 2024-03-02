import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Solicitacoes } from '../model/solicitacoes';
import { CommonModule } from '@angular/common';
import {  MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, MatTableModule,
     MatCardModule, MatToolbarModule, MatProgressSpinnerModule,
      MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent {
  solicitacoes: Solicitacoes[] = [];
  solicitacoesFiltradas: Solicitacoes[] = [];
  displayedColumns = ['nomeSolicitante', 'descricao', 'status'];

  filtroStatus: string = '';
  filtroNomeSolicitante: string = '';
  filtroDescricaoItem: string = '';
  selected = "";

  constructor(
  ) {}

  ngOnInit() {
    this.solicitacoes = [
      {id: 1, nomeSolicitante: 'João', descricao: 'Comprar 10 caixas de papel A4', status: ''},
      {id: 2, nomeSolicitante: 'Maria', descricao: 'Comprar 5 canetas', status: 'Aprovado'},
      {id: 3, nomeSolicitante: 'José', descricao: 'Comprar 5 canetas', status: 'Reprovado'},
      {id: 4, nomeSolicitante: 'Pedro', descricao: 'Comprar 5 canetas', status: 'Aprovado'},
      {id: 5, nomeSolicitante: 'Ana', descricao: 'Comprar 5 canetas', status: 'Reprovado'},
      {id: 6, nomeSolicitante: 'Paulo', descricao: 'Comprar 5 canetas', status: 'Aprovado'},
      {id: 7, nomeSolicitante: 'Marta', descricao: 'Comprar 5 canetas', status: 'Reprovado'},
      {id: 8, nomeSolicitante: 'Carlos', descricao: 'Comprar 5 canetas', status: 'Aprovado'},
      {id: 9, nomeSolicitante: 'Paula', descricao: 'Comprar 5 canetas', status: 'Reprovado'},
      {id: 10, nomeSolicitante: 'Fernando', descricao: 'Comprar 5 canetas', status: 'Aprovado'},
      {id: 11, nomeSolicitante: 'Juliana', descricao: 'Comprar 5 canetas', status: 'Reprovado'},
    ]
    this.solicitacoesFiltradas = this.solicitacoes;
  }

  filtrar() {
    if (this.filtroStatus || this.filtroNomeSolicitante || this.filtroDescricaoItem) {
      this.solicitacoesFiltradas = this.solicitacoes.filter(vl => 
        (vl.status.toLowerCase().includes(this.filtroStatus.toLowerCase()) || !this.filtroStatus) &&
        (vl.nomeSolicitante.toLowerCase().includes(this.filtroNomeSolicitante.toLowerCase()) || !this.filtroNomeSolicitante) &&
        (vl.descricao.toLowerCase().includes(this.filtroDescricaoItem.toLowerCase()) || !this.filtroDescricaoItem)
      );
    } else {
      this.solicitacoesFiltradas = this.solicitacoes
    }
  }

  limparFiltros() {
    this.filtroStatus = '';
    this.filtroNomeSolicitante = '';
    this.filtroDescricaoItem = '';
    this.solicitacoesFiltradas = this.solicitacoes
  }
}
