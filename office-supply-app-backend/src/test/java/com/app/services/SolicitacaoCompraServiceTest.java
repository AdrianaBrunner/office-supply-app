package com.app.services;

import com.app.entities.SolicitacaoCompra;
import com.app.entities.StatusSolicitacaoCompra;
import com.app.exceptions.DataNotFoundException;
import com.app.exceptions.DatabaseException;
import com.app.repositories.SolicitacaoCompraRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class SolicitacaoCompraServiceTest {

    @Mock
    private SolicitacaoCompraRepository solicitacaoCompraRepository;

    @InjectMocks
    private SolicitacaoCompraService solicitacaoCompraService;


    @Test
    @DisplayName("Listar solicitações com sucesso;")
    public void buscarListaSolicitacoesCompra() {
        when(solicitacaoCompraRepository.listarTodasSolicitacoes()).thenReturn(List.of(new SolicitacaoCompra(0L, "teste1", "PilhaAA", StatusSolicitacaoCompra.Reprovado, BigDecimal.valueOf(10.11), null), new SolicitacaoCompra(0L, "teste2", "PilhaAB", StatusSolicitacaoCompra.Aprovado, BigDecimal.valueOf(10.11), null)));

        List<SolicitacaoCompra> solicitacaoCompras = this.solicitacaoCompraService.listarSolicitacoes();

        assertNotNull(solicitacaoCompras);

        verify(solicitacaoCompraRepository, atLeastOnce()).listarTodasSolicitacoes();
    }

    @Test
    @DisplayName("Nenhuma solicitação encontrada")
    public void buscarListaSolicitacoesVazia() {
        when(solicitacaoCompraRepository.listarTodasSolicitacoes()).thenReturn(null);

        List<SolicitacaoCompra> solicitacaoCompras = this.solicitacaoCompraService.listarSolicitacoes();

        assertNull(solicitacaoCompras);

        verify(solicitacaoCompraRepository, atLeastOnce()).listarTodasSolicitacoes();
    }

    @Test
    @DisplayName("Banco de dados indisponível ao listar as solicitações de compra")
    public void listarSolicitacoesFalhaConexaoExcecao() {
        final String mensagemDeErro = "Banco de dados indisponível";

        when(solicitacaoCompraRepository.listarTodasSolicitacoes()).thenThrow(new DataIntegrityViolationException(mensagemDeErro));

        DatabaseException dataIntegrityViolationException = assertThrows(DatabaseException.class, () -> {
            this.solicitacaoCompraService.listarSolicitacoes();
        });

        assertEquals(dataIntegrityViolationException.getMessage(), mensagemDeErro);
    }


    @Test
    @DisplayName("Salvar nova solicitação de compra com sucesso")
    public void savarNovaSolicitacaoComSucesso() {
        SolicitacaoCompra novaConta = new SolicitacaoCompra(0L, "Jack", "Folha A4", StatusSolicitacaoCompra.Reprovado, BigDecimal.valueOf(7.80), "estoque");

        when(solicitacaoCompraRepository.save(any(SolicitacaoCompra.class))).thenReturn(novaConta);

        SolicitacaoCompra solicitacaoCompra = this.solicitacaoCompraService.adicionarSolicitacao(novaConta);

        assertNotNull(solicitacaoCompra);

        verify(solicitacaoCompraRepository, atLeastOnce()).save(solicitacaoCompra);
    }

    @Test
    @DisplayName("Banco de dados indisponível ao salvar nova solicitação de compra")
    public void savarNovaSolicitacaoFalhaConexaoExcecao() {
        final String mensagemDeErro = "Banco de dados indisponível";

        when(solicitacaoCompraRepository.save(any(SolicitacaoCompra.class))).thenThrow(new DataIntegrityViolationException(mensagemDeErro));

        DatabaseException dataIntegrityViolationException = assertThrows(DatabaseException.class, () -> {
            SolicitacaoCompra novaSolicitacao = new SolicitacaoCompra(0L, "Jack", "Folha A4", StatusSolicitacaoCompra.Reprovado, BigDecimal.valueOf(7.80), "estoque");
            this.solicitacaoCompraService.adicionarSolicitacao(novaSolicitacao);
        });

        assertEquals(dataIntegrityViolationException.getMessage(), mensagemDeErro);
    }

    @Test
    @DisplayName("Atualizar solicitação de compra")
    public void atualizarSolitacaoCompraComSucesso() {
        SolicitacaoCompra antigaSolicitacao = new SolicitacaoCompra(0L, "Jack", "Folha A4", null, BigDecimal.valueOf(7.80), null);
        SolicitacaoCompra novaSolicitacao = new SolicitacaoCompra(0L, "Jack", "Folha A4", StatusSolicitacaoCompra.Reprovado, BigDecimal.valueOf(7.80), "Temos em estoque");

        when(solicitacaoCompraRepository.findById(any(Long.class))).thenReturn(Optional.of(antigaSolicitacao));
        when(solicitacaoCompraRepository.save(any(SolicitacaoCompra.class))).thenReturn(novaSolicitacao);

        SolicitacaoCompra solicitacaoCompraAtualizada = solicitacaoCompraService.atualizarSolicitacao(novaSolicitacao);

        assertEquals(solicitacaoCompraAtualizada, novaSolicitacao);
        verify(solicitacaoCompraRepository, atLeastOnce()).findById(any(Long.class));
        verify(solicitacaoCompraRepository, atLeastOnce()).save(any(SolicitacaoCompra.class));
    }

    @Test
    @DisplayName("Solicitação não encontrada na atualização")
    public void solicacaoNaoEncotradaExcecao() {
        SolicitacaoCompra antigaSolicitacao = new SolicitacaoCompra(0L, "Jack", "Folha A4", null, BigDecimal.valueOf(7.80), null);
        final String mensagemErro = "Solicitação não encontrada!";
        when(solicitacaoCompraRepository.findById(any(Long.class))).thenReturn(Optional.empty());

        DataNotFoundException dataNotFoundException = assertThrows(DataNotFoundException.class, () -> {
            solicitacaoCompraService.atualizarSolicitacao(antigaSolicitacao);
        });

        assertEquals(dataNotFoundException.getMessage(), mensagemErro);
        verify(solicitacaoCompraRepository, atLeastOnce()).findById(any(Long.class));
    }

    @Test
    @DisplayName("Banco de dados indisponível ao atualizar a solicitação de compra")
    public void atualizarSolicitacaoFalhaConexaoExcecao() {
        final String mensagemDeErro = "Banco de dados indisponível";

        SolicitacaoCompra antigaSolicitacao = new SolicitacaoCompra(0L, "Jack", "Folha A4", null, BigDecimal.valueOf(7.80), null);
        SolicitacaoCompra novaSolicitacao = new SolicitacaoCompra(0L, "Jack", "Folha A4", StatusSolicitacaoCompra.Reprovado, BigDecimal.valueOf(7.80), "Temos em estoque");

        when(solicitacaoCompraRepository.findById(any(Long.class))).thenReturn(Optional.of(antigaSolicitacao));
        when(solicitacaoCompraRepository.save(any(SolicitacaoCompra.class))).thenThrow(new DataIntegrityViolationException(mensagemDeErro));

        DatabaseException databaseException = assertThrows(DatabaseException.class, () -> {
            this.solicitacaoCompraService.atualizarSolicitacao(novaSolicitacao);
        });

        assertEquals(databaseException.getMessage(), mensagemDeErro);
        verify(solicitacaoCompraRepository, atLeastOnce()).findById(any(Long.class));
        verify(solicitacaoCompraRepository, atLeastOnce()).save(any(SolicitacaoCompra.class));
    }
}
