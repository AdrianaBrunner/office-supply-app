import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { Solicitacoes } from '../model/solicitacoes';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-almoxarife',
  standalone: true,
  imports: [ MatCardModule, MatToolbarModule, MatTableModule,MatExpansionModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    FormsModule, ReactiveFormsModule, 
    NgxMaskPipe, NgxMaskDirective, CommonModule ],
  providers: [provideNgxMask()],
  templateUrl: './almoxarife.component.html',
  styleUrl: './almoxarife.component.scss'
})
export class AlmoxarifeComponent implements OnInit, AfterContentChecked {
  formulario: FormGroup;
  solicitacoes: Solicitacoes[] = [];
  solicitacoesFiltradas: Solicitacoes[] = [];
  displayedColumns = ['solicitante', 'descricao', 'preco', 'status'];
  desabilitarBotao: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit() {
   this.construirFormulario();

    this.solicitacoes = [
      { id: 1, solicitante: 'João', descricao: 'Comprar 10 caixas de papel A4', preco: 15.10, status: '' },
      { id: 2, solicitante: 'Maria', descricao: 'Comprar 5 canetas', preco: 15.10, status: '' },
      { id: 3, solicitante: 'José', descricao: 'Comprar 5 canetas', preco: 15.10, status: '' },
      { id: 4, solicitante: 'Pedro', descricao: 'Comprar 5 canetas', preco: 15.10, status: '' },
    ]
    this.solicitacoesFiltradas = this.solicitacoes;
  }
  
  validarObs(event) {
    if (event === 'reprovar') {
      this.formulario.get('observacoes').setValidators([Validators.required])
    } else { 
      this.formulario.get('observacoes').clearValidators();
      this.formulario.get('observacoes').setValue('');
    }
    
    this.formulario.get('observacoes').updateValueAndValidity();
  }

  construirFormulario() {
    this.formulario = this.formBuilder.group({
      solicitante: ['', ],
      descricao: [''],
      preco: [''],
      acao: [''],
      observacoes: ['']
    });
    this.formulario.markAllAsTouched();
    this.desabilitarCampos();
  }

  desabilitarCampos() {
    this.formulario.get('solicitante').disable();
    this.formulario.get('descricao').disable();
    this.formulario.get('preco').disable();
    this.formulario.get('acao').disable();
    this.desabilitarBotao = true;
  }

  salvar(panel) {
    console.log(this.formulario.value);
    
    panel.close();
    this.limparFormulario();
    this.mostrarSnackBar('Solicitação enviada com sucesso!', 'Ok');
  }

  mostrarSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  limparFormulario() {
    this.formulario.reset();
    this.desabilitarCampos();
  }

  preencherFormulario(solicitacao: Solicitacoes, panel: any) {
    panel.open();
    this.formulario.patchValue(solicitacao);
    this.formulario.get('acao').enable();
    this.desabilitarBotao = false;
  }
}
