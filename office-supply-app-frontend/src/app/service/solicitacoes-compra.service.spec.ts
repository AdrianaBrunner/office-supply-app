import { TestBed } from '@angular/core/testing';

import { SolicitacoesCompraService } from './solicitacoes-compra.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('SolicitacoesCompraService', () => {
  let service: SolicitacoesCompraService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SolicitacoesCompraService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar um get com o endpoint correto', () => {
    const spy = spyOn(httpClient, 'get').and.callThrough();
    service.listarSolicitacoes();
    expect(spy).toHaveBeenCalledWith('http://localhost:8080/solicitacao-compra');
  });

  it('deve chamar um post com o endpoint correto', () => {
    const spy = spyOn(httpClient, 'post').and.callThrough();
    service.criarSolicitacao({} as any);
    expect(spy).toHaveBeenCalledWith('http://localhost:8080/solicitacao-compra', {});
  });

  it('deve chamar um put com o endpoint correto', () => {
    const spy = spyOn(httpClient, 'put').and.callThrough();
    service.editarSolicitacao({} as any);
    expect(spy).toHaveBeenCalledWith('http://localhost:8080/solicitacao-compra', {});
  });

  it('deve retornar um observable com a resposta do get', () => {
    spyOn(httpClient, 'get').and.returnValue(of('response'));
    service.listarSolicitacoes().subscribe(res => {
      expect(res).toBe('response');
    });
  });

  it('deve retornar um observable com a resposta do post', () => {
    spyOn(httpClient, 'post').and.returnValue(of('response'));
    service.criarSolicitacao({} as any).subscribe(res => {
      expect(res).toBe('response');
    });
  });

  it('deve retornar um observable com a resposta do put', () => {
    spyOn(httpClient, 'put').and.returnValue(of('response'));
    service.editarSolicitacao({} as any).subscribe(res => {
      expect(res).toBe('response');
    });
  });
});
