package com.app.controllers;

import com.app.entities.SolicitacaoCompra;
import com.app.exceptions.DataNotFoundException;
import com.app.services.SolicitacaoCompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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

        SolicitacaoCompra solicitacaoCompra = solicitacaoCompraService.adicionarSolicitacao(solicitacao);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(solicitacaoCompra.getId()).toUri();

        return ResponseEntity.created(uri).body(solicitacaoCompraService.adicionarSolicitacao(solicitacao));
    }

    @PutMapping()
    public ResponseEntity<SolicitacaoCompra> atualizarSolicitacao(@RequestBody SolicitacaoCompra solicitacao) {
        return ResponseEntity.ok().body(solicitacaoCompraService.atualizarSolicitacao(solicitacao));
    }
}
