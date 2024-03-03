import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SolicitanteComponent } from './solicitante.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitacoesCompraService } from '../service/solicitacoes-compra.service';
import { of } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('SolicitanteComponent', () => {
  let component: SolicitanteComponent;
  let fixture: ComponentFixture<SolicitanteComponent>;
  let solicitacoesService: SolicitacoesCompraService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, SolicitanteComponent],
      providers: [
        FormBuilder,
        MatSnackBar,
        provideAnimations(),
        {
          provide: SolicitacoesCompraService,
          useValue: {
            listarSolicitacoes: () => of([]),
            criarSolicitacao: () => of({})
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;
    solicitacoesService = TestBed.inject(SolicitacoesCompraService);
    snackBar = TestBed.inject(MatSnackBar);
    spyOn(snackBar, 'open').and.stub();
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve listar solicitações ao inicializar', () => {
    const mockSolicitacoes = [{
      id: 1,
      solicitante: 'Teste',
      descricao: 'Descrição',
      preco: 100,
      status: 'Aprovado',
      observacao: 'Observação'
    }];
    spyOn(solicitacoesService, 'listarSolicitacoes').and.returnValue(of(mockSolicitacoes));
    component.ngOnInit();
    expect(component.solicitacoes).toEqual(mockSolicitacoes);
    expect(component.solicitacoesFiltradas).toEqual(mockSolicitacoes);
  });

  it('deve criar uma nova solicitação', () => {
    const mockFormValue = {
      id: 1,
      solicitante: 'Teste',
      descricao: 'Descrição',
      preco: 100,
      status: 'Aprovado',
      observacao: 'Observação'
    };
    spyOn(solicitacoesService, 'criarSolicitacao').and.returnValue(of({}));
    component.formulario.setValue(mockFormValue);
    component.salvar();
    expect(solicitacoesService.criarSolicitacao).toHaveBeenCalledWith(mockFormValue);
    expect(snackBar.open).toHaveBeenCalledWith('Solicitação realizada com sucesso!', 'Ok', { duration: 2000 });
    expect(component.formulario.getRawValue()).toEqual(component.valorInicialFormulario);
  });
});
