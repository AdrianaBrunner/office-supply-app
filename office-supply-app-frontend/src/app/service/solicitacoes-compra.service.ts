import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitacoes } from '../model/solicitacoes';

@Injectable({
  providedIn: 'root'
})
export class SolicitacoesCompraService {
  private readonly URL: string = 'http://localhost:8080/solicitacao-compra';

  constructor(
    private http: HttpClient
  ) { }

  listarSolicitacoes() {
    return this.http.get(this.URL);
  }

  criarSolicitacao(solicitacao: Solicitacoes) {
    return this.http.post(this.URL, solicitacao);
  }

  editarSolicitacao(solicitacao: Solicitacoes) {
    return this.http.put(this.URL, solicitacao);
  }
}
