<h2>Aplicação de Fluxo de Aprovação para Compra de Material de Escritório </h2>

Este projeto é uma aplicação web que gerencia o fluxo de compra de material de escritório.

<b>Características da aplicação</b>

- Possui 3 perfis de usuário: Solicitante, Almoxarife e Administrador.
- O solicitante poderá realizar uma nova solicitação de compra preenchendo os campos: nome do solicitante, descrição do item e preço. Após inserir a solicitação ele poderá visualizar a listagem de solicitações.

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

#### Angular 
Após clonar o projeto, abra a pasta office-supply-app-frontend na IDE de sua preferência e digite npm install no terminal. Finalizada a instalação, digitar ng serve -o para abrir a aplicação.

#### Java 
Em sua IDE abra a pasta office-supply-app-backend e execute a classe BackJavaSpringApplication.

#### Banco de dados 
- Crie seu login e senha no sql server(ssms).
- Abrir o arquivo application.properties dentro da pasta office-supply-app-backend 
- Preencher seu usuario e senha conforme abaixo:

```# Database connection settings
spring.datasource.url=jdbc:sqlserver://DESKTOP-8A8FEJD\\MSSQLSERVER01:1433;databaseName=office;encrypt=false
spring.datasource.username=seuUsuarioAqui <-----
spring.datasource.password=suaSenhaAqui <------
# JDBC driver
spring.datasource.driverClassName=com.microsoft.sqlserver.jdbc.SQLServerDriver
# Hibernate settings
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServerDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```

Para criação do banco de dados: dentro do seu SSMS rodar o seguinte script:

```
create database officedb
```

A tabela solicitacao_compra será criada pelo JPA na primeira execução do programa.

Obs: Em caso de contratempos com o banco de dados SQL Server, o arquivo application.properties oferece a opção de configurar o uso do banco H2 como alternativa. Para isso, basta descomentar as configurações referentes ao H2 e comentar as configurações do SQL Server.

#### Breakpoints de responsividade: 
- celular 320px 
- tablet 768px
- desktop 1024px
- monitor 1280px

### 🎬 Visualização do Funcionamento do Sistema

- <b> Tela do solicitante:

![TelaSolicitante](https://github.com/AdrianaBrunner/office-supply-app/assets/88938672/e36216da-bb61-45a3-bc27-5fddd7d7ad25)

- Tela do almoxarife

![TelaAlmoxarife](https://github.com/AdrianaBrunner/office-supply-app/assets/88938672/8e761003-a255-4121-8ed4-d2289b0e2786)


- Tela do administrador

![TelaAdministrador](https://github.com/AdrianaBrunner/office-supply-app/assets/88938672/f0bef0b1-1496-4601-a773-628586c6235e)



