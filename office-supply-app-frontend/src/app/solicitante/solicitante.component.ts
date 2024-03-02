import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-solicitante',
  standalone: true,
  imports: [ MatCardModule, MatToolbarModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, FormsModule, NgxMaskDirective,
    NgxMaskPipe, ReactiveFormsModule ],
  providers: [provideNgxMask()],
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss'
})
export class SolicitanteComponent implements OnInit {
  formulario: FormGroup;
  valorInicialFormulario: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.construirFormulario();
  }

  construirFormulario() {
    this.formulario = this.formBuilder.group({
      solicitante: [''],
      descricao: [''],
      preco: ['']
    });
    this.valorInicialFormulario = this.formulario.value;
    this.formulario.markAllAsTouched();
  }

  salvar() {
    console.log(this.formulario.value);
    this.mostrarSnackBar('Solicitação realizada com sucesso!', 'Ok');
    this.limparFormulario();
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
