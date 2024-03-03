import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Solicitacoes } from '../model/solicitacoes';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitacoesCompraService } from '../service/solicitacoes-compra.service';
import { take } from 'rxjs';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-almoxarife',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatTableModule, MatExpansionModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    FormsModule, ReactiveFormsModule, NgxCurrencyDirective,
    CommonModule],
  providers: [],
  templateUrl: './almoxarife.component.html',
  styleUrl: './almoxarife.component.scss'
})
export class AlmoxarifeComponent implements OnInit, AfterContentChecked {
  formulario: FormGroup;
  solicitacoes: Solicitacoes[] = [];
  solicitacoesFiltradas: Solicitacoes[] = [];
  displayedColumns = ['solicitante', 'descricao', 'preco', 'status', 'observacao'];
  desabilitarBotao: boolean = true;

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
      next: (res: Solicitacoes[]) => { this.solicitacoes = res; this.solicitacoesFiltradas = this.solicitacoes; },
      error: (err) => {
        console.dir(err);
        this.snackBar.open(err.error.message, 'Ok', { duration: 2000 })
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
    this.formulario.markAllAsTouched();
    this.desabilitarCampos();
  }

  desabilitarCampos() {
    this.formulario.get('solicitante').disable();
    this.formulario.get('descricao').disable();
    this.formulario.get('preco').disable();
    this.formulario.get('status').disable();
    this.desabilitarBotao = true;
  }

  editar(panel) {
    this.solicitacoesService.editarSolicitacao(this.formulario.getRawValue()).pipe(take(1)).subscribe({
      next: () => {
        panel.close();
        this.limparFormulario();
        this.snackBar.open('Solicitação atualizada com sucesso!', 'Ok', { duration: 2000 });
        this.listarSolicitacoes();
      }, error: (err) => { this.snackBar.open(err, 'Ok', { duration: 2000 }) }
    });

  }
  
  limparFormulario() {
    this.formulario.reset();
    this.desabilitarCampos();
  }

  preencherFormulario(solicitacao: Solicitacoes, panel: any) {
    panel.open();
    this.formulario.patchValue(solicitacao);
    this.formulario.get('status').enable();
    this.desabilitarBotao = false;
  }
}
