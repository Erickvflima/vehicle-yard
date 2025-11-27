### Back-end — Vehicle Yard (Controle de Pátio de Veículo)

Este repositório contém o back-end de um sistema de gestão de pario de veículo fictício, ele foi desenvolvido como projeto de analise de conhecimentos de desenvolvimento em NestJS, TypeORM, banco de dados PostgreSQL.

## Sobre o Projeto

Este back-end disponibiliza APIs CRUD de veículo, motorista e utilização do veículo.

## Atenção:
Para o funcionamento correto, é necessario ter o node, yarn e o docker instalado globalmente na maquina. Os comandos foram configurados apenas para ambiente windows.

## Tecnologias Utilizadas

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* TypeORM
* Docker & Docker Compose

## Configuração do Ambiente

Antes de rodar o projeto, configure o arquivo de env. Como é um projeto de teste, disponibilizo os valores padrão:

DB_HOST='localhost'
DB_PORT=5432
DB_USER='postgres'
DB_PASS='postgres'
PORT=3000

## Scripts Disponíveis

O projeto possui scripts para facilitar o setup, build, migrações e start do servidor.

* **db:up** - Sobe o banco de dados via Docker Compose
* **db:down** - Para o banco de dados
* **migration:run** - Executa as migrations configuradas
* **build** - Compila o projeto
* ** ** - Inicia o servidor em modo desenvolvimento

## Executando o Projeto Localmente
1. Instale as dependências: yarn install
2.1 Na primeira vez que rodar o projeto, utilize em sua respectiva ordem: yarn db:up; yarn migration:run 
2.2 Rode o servidor de desenvolvimento: yarn dev