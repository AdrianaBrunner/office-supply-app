package com.app.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Entity
@Table(name = "solicitacao_compra")
public class SolicitacaoCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 200, nullable = false)
    private String solicitante;

    @Column(length = 200, nullable = false)
    private String descricao;

    @Column(length = 10)
    private StatusSolicitacaoCompra status;

    private BigDecimal preco;

    private String observacao;

    public SolicitacaoCompra(Long id, String solicitante, String descricao, StatusSolicitacaoCompra status, BigDecimal preco, String observacao) {
        this.id = id;
        this.solicitante = solicitante;
        this.descricao = descricao;
        this.status = status;
        this.preco = preco;
        this.observacao = observacao;
    }
}
