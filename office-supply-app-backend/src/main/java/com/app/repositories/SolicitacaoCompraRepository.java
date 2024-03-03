package com.app.repositories;

import com.app.entities.SolicitacaoCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SolicitacaoCompraRepository extends JpaRepository<SolicitacaoCompra, Long> {
    @Query(value = "select * from solicitacao_compra order by id desc", nativeQuery = true)
    List<SolicitacaoCompra> listarTodasSolicitacoes();
}