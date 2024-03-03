package com.app.controllers;

import com.app.entities.SolicitacaoCompra;
import com.app.exceptions.DataNotFoundException;
import com.app.services.SolicitacaoCompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/solicitacao-compra")
public class SolicitacaoCompraController {

    @Autowired
    private SolicitacaoCompraService solicitacaoCompraService;

    @GetMapping
    public ResponseEntity<List<SolicitacaoCompra>> listarSolicitacoes() {
        List<SolicitacaoCompra> solicitacaoCompras = solicitacaoCompraService.listarSolicitacoes();
        if (solicitacaoCompras.isEmpty()) {
            throw new DataNotFoundException("Nenhuma solicitação encontrada!");
        }
        return ResponseEntity.ok().body(solicitacaoCompraService.listarSolicitacoes());
    }

    @PostMapping
    public ResponseEntity<SolicitacaoCompra> adicionarSolicitacao(@RequestBody SolicitacaoCompra solicitacao) {
        return ResponseEntity.accepted().body(solicitacaoCompraService.adicionarSolicitacao(solicitacao));
    }

    @PutMapping()
    public ResponseEntity<SolicitacaoCompra> atualizarSolicitacao(@RequestBody SolicitacaoCompra solicitacao) {
        return ResponseEntity.accepted().body(solicitacaoCompraService.atualizarSolicitacao(solicitacao));
    }
}
