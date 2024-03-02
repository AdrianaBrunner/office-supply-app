import { TestBed } from '@angular/core/testing';

import { SolicitacoesCompraService } from './solicitacoes-compra.service';

describe('SolicitacoesCompraService', () => {
  let service: SolicitacoesCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacoesCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
