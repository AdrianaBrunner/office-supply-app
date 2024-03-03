import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitacoes } from '../model/solicitacoes';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitacoesCompraService } from '../service/solicitacoes-compra.service';
import { BehaviorSubject, take } from 'rxjs';
import { NgxCurrencyDirective } from 'ngx-currency';
import { SharedImportsModule } from '../shared/shared-imports.module';

@Component({
  selector: 'app-almoxarife',
  standalone: true,
  imports: [NgxCurrencyDirective, SharedImportsModule],
  providers: [],
  templateUrl: './almoxarife.component.html',
  styleUrl: './almoxarife.component.scss'
})

export class AlmoxarifeComponent implements OnInit, AfterContentChecked {
  formulario: FormGroup;
  solicitacoes: BehaviorSubject<Solicitacoes[]> = new BehaviorSubject<Solicitacoes[]>([]);
  desabilitarBotao: boolean = true;
  valorInicialFormulario: any;
  @ViewChild('panel') panel: MatExpansionPanel;

  constructor(
    private formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private solicitacoesService: SolicitacoesCompraService
  ) { }

  ngAfterContentChecked() {
    this.cdref.detectChanges(); 
  }

  ngOnInit() {
    this.construirFormulario();
    this.listarSolicitacoes();
  }

  listarSolicitacoes() {
    this.solicitacoesService.listarSolicitacoes().subscribe({
      next: (response: Solicitacoes[]) => { this.solicitacoes.next(response); },
      error: (err) => {
        err.error && err.error.message 
        ? this.snackBar.open(err.error.message, 'Ok', { duration: 2000 })
        : this.snackBar.open('Ocorreu um erro ao listar as solicitações.', 'Ok', { duration: 2000 });
      }
    });
  }

  validarObs(event) {
    if (event === 'Reprovado') {
      this.formulario.get('observacao').setValidators([Validators.required])
    } else {
      this.formulario.get('observacao').clearValidators();
      this.formulario.get('observacao').setValue('');
    }
    this.formulario.get('observacao').updateValueAndValidity();
  }

  construirFormulario() {
    this.formulario = this.formBuilder.group({
      id: [''],
      solicitante: [''],
      descricao: [''],
      preco: [''],
      status: [''],
      observacao: ['']
    });
    this.valorInicialFormulario = this.formulario.value;
    this.formulario.markAllAsTouched();
    this.desabilitarBotao = true;
    }

  editar(panel) {
    this.solicitacoesService.editarSolicitacao(this.formulario.value).pipe(take(1)).subscribe({
      next: () => {
        panel.close();
        this.snackBar.open('Solicitação atualizada com sucesso!', 'Ok', { duration: 2000 });
        this.limparFormulario();
        this.listarSolicitacoes();
      }, error: (err) => { this.snackBar.open(err, 'Ok', { duration: 2000 }) }
    });

  }
  
  limparFormulario() {
    this.formulario.reset(this.valorInicialFormulario);
    this.desabilitarBotao = true;
  }

  preencherFormulario(event: any) {
    this.panel.open();
    this.formulario.patchValue(event);
    this.formulario.get('status').enable();
    this.desabilitarBotao = false;
  }
}
