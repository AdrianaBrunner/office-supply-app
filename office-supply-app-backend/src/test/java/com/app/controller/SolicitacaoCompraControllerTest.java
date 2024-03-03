package com.app.controller;

import com.app.controllers.SolicitacaoCompraController;
import com.app.services.SolicitacaoCompraService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SolicitacaoCompraController.class)
public class SolicitacaoCompraControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SolicitacaoCompraService solicitacaoCompraService;

    @Test
    @DisplayName("Nenhuma solicitação cadastrada no banco de dados")
    public void obterListaSolicitacaoErro404() throws Exception {
        mockMvc.perform(get("/solicitacao-compra"))
                .andExpect(status().isNotFound())
                .andExpect(result -> result.getResolvedException().getLocalizedMessage().equals("Nenhuma solicitação encontrada!"));
    }

    @Test
    @DisplayName("Salvar solicitação de compra do banco de dados")
    public void salvarSolicitacaoComSucesso() throws Exception {

        String jsonRequestBody = "{\"id\":\"1\",\"solicitante\":\"adri\",\"descricao\":\"Pilha\",\"status\":\"Aprovado\",\"preco\":\"1.1\",\"observacao\":\"\"}";

        mockMvc.perform(post("/solicitacao-compra")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequestBody))
                .andExpect(status().isCreated());
    }
}
