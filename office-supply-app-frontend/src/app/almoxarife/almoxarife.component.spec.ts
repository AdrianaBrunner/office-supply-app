import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlmoxarifeComponent } from './almoxarife.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitacoesCompraService } from '../service/solicitacoes-compra.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';

fdescribe('AlmoxarifeComponent', () => {
  let component: AlmoxarifeComponent;
  let fixture: ComponentFixture<AlmoxarifeComponent>;
  let solicitacoesService: SolicitacoesCompraService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTableModule,
        MatCardModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AlmoxarifeComponent
      ],
      providers: [
        FormBuilder,
        SolicitacoesCompraService,
        HttpClient,
        HttpHandler,
        MatSnackBar,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmoxarifeComponent);
    component = fixture.componentInstance;
    solicitacoesService = TestBed.inject(SolicitacoesCompraService);
    snackBar = TestBed.inject(MatSnackBar);
    spyOn(snackBar, 'open').and.stub();
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve construir o formulário corretamente', () => {
    expect(component.formulario).toBeTruthy();
  });

  it('deve validar as observações corretamente', () => {
    component.validarObs('Reprovado');
    expect(component.formulario.get('observacao').validator).toBeTruthy();

    component.validarObs('Aprovado');
    expect(component.formulario.get('observacao').validator).toBeNull();
  });

  it('deve desabilitar os campos do formulário corretamente', () => {
    component.desabilitarCampos();
    expect(component.formulario.get('solicitante').disabled).toBeTruthy();
    expect(component.formulario.get('descricao').disabled).toBeTruthy();
    expect(component.formulario.get('preco').disabled).toBeTruthy();
    expect(component.formulario.get('status').disabled).toBeTruthy();
    expect(component.desabilitarBotao).toBeTruthy();
  });

  it('deve editar uma solicitação corretamente', () => {
    const mockSolicitacao = {
      id: 1,
      solicitante: 'Teste',
      descricao: 'Descrição',
      preco: 100,
      status: 'Aprovado',
      observacao: ''
    };
    spyOn(solicitacoesService, 'editarSolicitacao').and.returnValue(of(mockSolicitacao));
    component.formulario.patchValue(mockSolicitacao);
    component.editar({ close: () => {} });
    expect(solicitacoesService.editarSolicitacao).toHaveBeenCalledWith(mockSolicitacao);
    expect(snackBar.open).toHaveBeenCalledWith('Solicitação atualizada com sucesso!', 'Ok', { duration: 2000 });
    expect(component.desabilitarBotao).toBeTruthy();
  });

});
