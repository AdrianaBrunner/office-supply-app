import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Solicitacoes } from '../model/solicitacoes';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitacoesCompraService } from '../service/solicitacoes-compra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, MatTableModule,
    MatCardModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorModule, 
    FormsModule, ReactiveFormsModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent implements OnInit {
  formulario: FormGroup;
  valorInicialFormulario: any;

  solicitacoes: Solicitacoes[] = [];
  solicitacoesFiltradas: Solicitacoes[] = [];
  displayedColumns = ['solicitante', 'descricao', 'preco', 'status', 'observacao'];

  constructor(
    private solicitacoesService: SolicitacoesCompraService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
   this.construirFormulario();
   this.listarSolicitacoes();
  }

  listarSolicitacoes() {
    this.solicitacoesService.listarSolicitacoes().subscribe({
      next: (res: Solicitacoes[]) => { this.solicitacoes = res; this.solicitacoesFiltradas = this.solicitacoes; },
      error: (err) => {
        console.dir(err);
        this.snackBar.open(err.error.message, 'Ok', { duration: 2000 })
      }
    });
  }

  filtrar() {
    const status = this.formulario.get('filtroStatus').value;
    const solicitante = this.formulario.get('filtroSolicitante').value;
    const descricao = this.formulario.get('filtroDescricao').value;
    
    if (status || solicitante || descricao) {
      this.solicitacoesFiltradas = this.solicitacoes.filter(vl =>
        (vl.status && vl.status.toLowerCase().includes(status.toLowerCase()) || !status) &&
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
