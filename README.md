<h2>Aplicação de Fluxo de Aprovação para Compra de Material de Escritório </h2>

Este projeto é uma aplicação web que gerencia o fluxo de compra de material de escritório.

<b>Características da aplicação</b>

- Possui 3 perfis de usuário: Solicitante, Almoxarife e Administrador.
- O solicitante poderá realizar uma nova solicitação de compra preenchendo os campos: nome do solicitante, descrição do item e preço do produto (com máscara R$ 00,00). Após inserir a solicitação ele poderá visualizar a listagem de solicitações.

- O almoxarife é responsável por aprovar ou reprovar as solicitações. Em sua tela ele terá acesso a listagem de solicitações e ao selecionar uma delas deve preencher o campo Ação com as opções Aprovar ou Reprovar. Se reprovar é necessário que digite uma observação.

- O administrador poderá consultar toda a listagem de solicitações e também filtrar por status (todos, aprovado ou reprovado), nome do solicitante e descrição do item.

<b>Requisitos</b>
- Angular 17
- Java (jdk 21) com Spring Boot 3.2.3
- Maven - (https://maven.apache.org/download.cgi) > apache-maven-3.9.6-bin.zip
- Microsoft SQL Server
- SSMS (SQL Server Management Studio);

<b>Tecnologias utilizadas</b>

Angular, Angular Material, TypeScript, CSS, SASS, HTML5, Karma, Jasmine. <br>
Java, Spring Boot, JUnit5, Mockito.

### 📁 Acesso ao projeto

[Via código fonte do projeto](https://github.com/AdrianaBrunner/office-supply-app) no GitHub, [baixá-lo em .zip](https://github.com/AdrianaBrunner/office-supply-app/archive/refs/heads/main.zip) ou ainda clonar o projeto utilizando Git Bash + o comando:

       $ git clone https://github.com/AdrianaBrunner/office-supply-app.git

### 🔧 Instalação

#### Banco de dados 
- Crie seu login e senha no sql server(ssms).
- Após conectar, deve criar o banco de dados: dentro do SQL Server Management Studio rodar o seguinte script:

```
create database officedb
```

- Abrir o arquivo application.properties dentro da pasta office-supply-app-backend 
- Preencher seu usuario e senha conforme indicado pelas setas abaixo:

```# Database connection settings
spring.datasource.url=jdbc:sqlserver://DESKTOP-8A8FEJD\\MSSQLSERVER01:1433;databaseName=officedb;encrypt=false
spring.datasource.username=seuUsuarioAqui <-----
spring.datasource.password=suaSenhaAqui <------
# JDBC driver
spring.datasource.driverClassName=com.microsoft.sqlserver.jdbc.SQLServerDriver
# Hibernate settings
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServerDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```

A tabela solicitacao_compra será criada pelo JPA na primeira execução do programa.

Obs: Em caso de contratempos com o banco de dados SQL Server, o arquivo application.properties oferece a opção de configurar o uso do banco H2 como alternativa. Para isso, basta descomentar as configurações referentes ao H2 e comentar as configurações do SQL Server.

#### Java 
Em sua IDE abra a pasta office-supply-app-backend e execute a classe BackJavaSpringApplication.

#### Angular 
Após clonar o projeto, abra a pasta office-supply-app-frontend na IDE de sua preferência e digite npm install no terminal. Finalizada a instalação, digitar ng serve -o para abrir a aplicação.

#### Breakpoints de responsividade: 
- celular 320px 
- tablet 768px
- desktop 1024px
- monitor 1280px

### 🎬 Visualização do Funcionamento do Sistema

- <b> Tela do solicitante:

![TelaSolicitante](https://github.com/AdrianaBrunner/office-supply-app/assets/88938672/41b901ec-8056-481e-ab26-36eab5d90266)

- Tela do almoxarife

![TelaAlmoxarife](https://github.com/AdrianaBrunner/office-supply-app/assets/88938672/c54edadf-eed9-49e7-bf77-2ff4bcc1fa66)

- Tela do administrador

![TelaAdministrador](https://github.com/AdrianaBrunner/office-supply-app/assets/88938672/8dbf902d-85a4-476d-b8b6-e5f14c4dcd7a)



