import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Solicitacoes } from '../model/solicitacoes';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, MatTableModule,
    MatCardModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, 
    FormsModule, ReactiveFormsModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent implements OnInit {
  formulario: FormGroup;
  valorInicialFormulario: any;

  solicitacoes: Solicitacoes[] = [];
  solicitacoesFiltradas: Solicitacoes[] = [];
  displayedColumns = ['solicitante', 'descricao', 'preco', 'status'];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
   this.construirFormulario();

    this.solicitacoes = [
      { id: 1, solicitante: 'João', descricao: 'Comprar 10 caixas de papel A4', preco: 15.00, status: '' },
      { id: 2, solicitante: 'Maria', descricao: 'Comprar 5 canetas', preco: 15.00, status: 'Aprovado' },
      { id: 3, solicitante: 'José', descricao: 'Comprar 5 canetas', preco: 15.00, status: 'Reprovado' },
      { id: 4, solicitante: 'Pedro', descricao: 'Comprar 5 canetas', preco: 15.00, status: 'Aprovado' },
    ]
    this.solicitacoesFiltradas = this.solicitacoes;
  }

  filtrar() {
    const status = this.formulario.get('filtroStatus').value;
    const solicitante = this.formulario.get('filtroSolicitante').value;
    const descricao = this.formulario.get('filtroDescricao').value;
    
    if (status || solicitante || descricao) {
      this.solicitacoesFiltradas = this.solicitacoes.filter(vl =>
        (vl.status.toLowerCase().includes(status.toLowerCase()) || !status) &&
        (vl.solicitante.toLowerCase().includes(solicitante.toLowerCase()) || !solicitante) &&
        (vl.descricao.toLowerCase().includes(descricao.toLowerCase()) || !descricao)
      );
    } else {
      this.solicitacoesFiltradas = this.solicitacoes
    }
  }

  construirFormulario() {
    this.formulario = this.formBuilder.group({
      filtroStatus: [''],
      filtroSolicitante: [''],
      filtroDescricao: ['']
    });
    this.valorInicialFormulario = this.formulario.value;
  }

  limparFiltros() {
    this.formulario.reset(this.valorInicialFormulario);
    this.solicitacoesFiltradas = this.solicitacoes
  }
  
}
