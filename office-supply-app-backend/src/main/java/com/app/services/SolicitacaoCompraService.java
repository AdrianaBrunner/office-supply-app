package com.app.services;

import com.app.entities.SolicitacaoCompra;
import com.app.exceptions.DataNotFoundException;
import com.app.exceptions.DatabaseException;
import com.app.repositories.SolicitacaoCompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class SolicitacaoCompraService {

    @Autowired
    private SolicitacaoCompraRepository solicitacaoCompraRepository;

    public List<SolicitacaoCompra> listarSolicitacoes() {
        List<SolicitacaoCompra> list;
        try {
            list = solicitacaoCompraRepository.listarTodasSolicitacoes();
        } catch (DataIntegrityViolationException ex) {
            throw new DatabaseException(ex.getMessage());
        }
        return list;
    }

    public SolicitacaoCompra adicionarSolicitacao(SolicitacaoCompra solicitacao) {
        SolicitacaoCompra novaSolicitacao;
        try {
            novaSolicitacao = solicitacaoCompraRepository.save(solicitacao);
        } catch (DataIntegrityViolationException ex) {
            throw new DatabaseException(ex.getMessage());
        }
        return novaSolicitacao;
    }

    public SolicitacaoCompra atualizarSolicitacao(SolicitacaoCompra solicitacao) {
        SolicitacaoCompra solicitacaoAtual;
        try {
            solicitacaoAtual = solicitacaoCompraRepository.findById(solicitacao.getId()).orElseThrow(
                    () -> new DataNotFoundException("Solicitação não encontrada!")
            );
            solicitacaoAtual.setStatus(solicitacao.getStatus());
            solicitacaoAtual.setObservacao(solicitacao.getObservacao());
            return solicitacaoCompraRepository.save(solicitacaoAtual);
        } catch (DataIntegrityViolationException ex) {
            throw new DatabaseException(ex.getMessage());
        }
    }
}
