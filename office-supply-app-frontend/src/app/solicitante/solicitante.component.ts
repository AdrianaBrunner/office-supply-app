import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitacoesCompraService } from '../service/solicitacoes-compra.service';
import { BehaviorSubject, take } from 'rxjs';
import { NgxCurrencyDirective } from 'ngx-currency';
import { Solicitacoes } from '../model/solicitacoes';
import { SharedImportsModule } from '../shared/shared-imports.module';
@Component({
  selector: 'app-solicitante',
  standalone: true,
  imports: [ NgxCurrencyDirective, SharedImportsModule ],
  providers: [],
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss'
})

export class SolicitanteComponent implements OnInit {
  formulario: FormGroup;
  valorInicialFormulario: any;
  solicitacoes: BehaviorSubject<Solicitacoes[]> = new BehaviorSubject<Solicitacoes[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private solicitacoesService: SolicitacoesCompraService
  ) {}

  ngOnInit() {
    this.construirFormulario();
    this.listarSolicitacoes();
  }

  listarSolicitacoes() {
    this.solicitacoesService.listarSolicitacoes().subscribe({
      next: (response: Solicitacoes[]) => { this.solicitacoes.next(response); },
      error: (err) => {
        error: (err) => {
          err.error && err.error.message 
          ? this.snackBar.open(err.error.message, 'Ok', { duration: 2000 })
          : this.snackBar.open('Ocorreu um erro ao listar as solicitações.', 'Ok', { duration: 2000 });
        }
      }
    });
  }

  construirFormulario() {
    this.formulario = this.formBuilder.group({
      id: [''],
      solicitante: [''],
      descricao: [''],
      preco: [''],
      status: [null],
      observacao: [''],
    });
    this.valorInicialFormulario = this.formulario.value;
    this.formulario.markAllAsTouched();
  }

  salvar() {
    const data = this.formulario.getRawValue();
    this.solicitacoesService.criarSolicitacao(data).pipe(take(1)).subscribe(() => {
      this.mostrarSnackBar('Solicitação realizada com sucesso!', 'Ok');
      this.limparFormulario();
      this.listarSolicitacoes();
    });
  }

  limparFormulario() {
    this.formulario.reset(this.valorInicialFormulario);
  }

  mostrarSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
