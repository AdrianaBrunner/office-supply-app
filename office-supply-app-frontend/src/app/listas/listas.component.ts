import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Solicitacoes } from '../model/solicitacoes';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-listas',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './listas.component.html',
  styleUrl: './listas.component.scss'
})
export class ListasComponent {
  @Input() solicitacoesFiltradas: BehaviorSubject<Solicitacoes[]>;  
  @Input() habilitarClick: boolean;
  @Output() preencherFormularioEvent = new EventEmitter<any>();

  solicitacoes: Solicitacoes[] = [];
  displayedColumns = ['solicitante', 'descricao', 'preco', 'status', 'observacao'];

  constructor() { }

  ngOnInit() { }

  preencherFormulario(event: any) {
    this.preencherFormularioEvent.emit(event);
  }
}
