import { Component, OnInit } from '@angular/core';
import { Solicitacoes } from '../model/solicitacoes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SolicitacoesCompraService } from '../service/solicitacoes-compra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { SharedImportsModule } from '../shared/shared-imports.module';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [ SharedImportsModule ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent implements OnInit {
  formulario: FormGroup;
  valorInicialFormulario: any;

  solicitacoes: BehaviorSubject<Solicitacoes[]> = new BehaviorSubject<Solicitacoes[]>([]);
  solicitacoesFiltradas: BehaviorSubject<Solicitacoes[]> = new BehaviorSubject<Solicitacoes[]>([]);

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
      next: (response: Solicitacoes[]) => { this.solicitacoes.next(response); this.solicitacoesFiltradas.next(response) },
      error: (err) => {
        err.error && err.error.message 
        ? this.snackBar.open(err.error.message, 'Ok', { duration: 2000 })
        : this.snackBar.open('Ocorreu um erro ao listar as solicitações.', 'Ok', { duration: 2000 });
      } 
    });
  }

  filtrar() {
    const status = this.formulario.get('filtroStatus').value;
    const solicitante = this.formulario.get('filtroSolicitante').value;
    const descricao = this.formulario.get('filtroDescricao').value;
    
    if (status || solicitante || descricao) {
      this.solicitacoesFiltradas.next(this.solicitacoes.value.filter(vl =>
        ((vl.status && vl.status.toLowerCase().includes(status.toLowerCase())) || !status) &&
        (vl.solicitante.toLowerCase().includes(solicitante.toLowerCase()) || !solicitante) &&
        (vl.descricao.toLowerCase().includes(descricao.toLowerCase()) || !descricao)
      ))
    } else {
      this.solicitacoesFiltradas.next(this.solicitacoes.value);
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
    this.solicitacoesFiltradas.next(this.solicitacoes.value);
  }
  
}
