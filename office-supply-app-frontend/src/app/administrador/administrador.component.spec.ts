import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { AdministradorComponent } from './administrador.component';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitacoesCompraService } from '../service/solicitacoes-compra.service';
import { HttpClient, HttpHandler } from '@angular/common/http'; // Importe do @angular/common/http
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('AdministradorComponent', () => {
  let component: AdministradorComponent;
  let fixture: ComponentFixture<AdministradorComponent>;
  let solicitacoesService: SolicitacoesCompraService;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        AdministradorComponent,
        CommonModule
      ],
      providers: [
        SolicitacoesCompraService,
        HttpClient,
        HttpHandler,
        provideAnimations()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorComponent);
    component = fixture.componentInstance;
    solicitacoesService = TestBed.inject(SolicitacoesCompraService);
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve listar solicitacoes', () => {
    const mockSolicitacoes = [{
      id: 1,
      status: 'Aprovado',
      solicitante: 'João',
      descricao: 'Compra de material',
      preco: 100,
      observacao: ''
    }];
    spyOn(solicitacoesService, 'listarSolicitacoes').and.returnValue(of(mockSolicitacoes)); 
    component.ngOnInit();
    expect(component.solicitacoes).toEqual(mockSolicitacoes);
    expect(component.solicitacoesFiltradas).toEqual(mockSolicitacoes);
  });

  it('deve filtrar solicitacoes', () => {
    component.solicitacoes = [
      { id: 1, status: 'Aprovado', solicitante: 'João', descricao: 'Compra de material', preco: 100, observacao: '' },
      { id: 2, status: 'Pendente', solicitante: 'Maria', descricao: 'Compra de equipamento', preco: 200, observacao: '' }
    ];
    component.formulario = new FormGroup({
      filtroStatus: new FormControl('Aprovado'),
      filtroSolicitante: new FormControl('João'),
      filtroDescricao: new FormControl('Compra de material')
    });
    component.filtrar();
    expect(component.solicitacoesFiltradas.length).toBe(1);
    expect(component.solicitacoesFiltradas[0].status).toBe('Aprovado');
    expect(component.solicitacoesFiltradas[0].solicitante).toBe('João');
    expect(component.solicitacoesFiltradas[0].descricao).toBe('Compra de material');
  });

  it('deve construir formulario', () => {
    expect(component.formulario).toBeTruthy();
  });

  it('deve limpar filtros', () => {
    component.limparFiltros();
    expect(component.formulario.value).toEqual(component.valorInicialFormulario);
  });
});