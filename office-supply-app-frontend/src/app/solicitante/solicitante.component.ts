import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitacoesCompraService } from '../service/solicitacoes-compra.service';
import { take } from 'rxjs';
import { NgxCurrencyDirective } from 'ngx-currency';
import { Solicitacoes } from '../model/solicitacoes';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-solicitante',
  standalone: true,
  imports: [ MatCardModule, MatToolbarModule, MatTableModule, CommonModule, MatIconModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, MatExpansionModule, MatButtonModule, FormsModule, NgxCurrencyDirective, ReactiveFormsModule ],
  providers: [],
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss'
})
export class SolicitanteComponent implements OnInit {
  formulario: FormGroup;
  valorInicialFormulario: any;
  solicitacoes: Solicitacoes[] = [];
  solicitacoesFiltradas: Solicitacoes[] = [];
  displayedColumns = ['solicitante', 'descricao', 'preco', 'status', 'observacao'];

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
      next: (res: Solicitacoes[]) => { this.solicitacoes = res; this.solicitacoesFiltradas = this.solicitacoes; },
      error: (err) => {
        console.dir(err);
        this.snackBar.open(err.error.message, 'Ok', { duration: 2000 })
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
    });
    this.limparFormulario();
    this.listarSolicitacoes();
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
