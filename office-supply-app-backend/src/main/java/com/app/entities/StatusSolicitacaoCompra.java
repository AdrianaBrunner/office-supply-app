package com.app.entities;

public enum StatusSolicitacaoCompra {

    Aprovado("Aprovado"),
    Reprovado("Reprovado");

    private String statusDescricao;

    StatusSolicitacaoCompra(String statusDescricao) {
        this.statusDescricao = statusDescricao;
    }

    public String getStatusDescricao() {
        return statusDescricao;
    }
}
