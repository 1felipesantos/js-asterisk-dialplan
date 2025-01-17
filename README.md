# Asterisk-Dialplan

O projeto Asterisk-Dialplan foi criado por Felipe Santos, com o intuito de facilitar o roteamento de chamadas em plataformas Asterisk. O projeto disponibiliza uma API
para roteamento das chamadas, possibilitando a customização de parâmetros, como o número de destino, por exemplo.

## Instalação

Esse projeto utiliza .env e devido a isso, torna-se necessário a criação do referido arquivo na pasta raíz. O arquivo deverá ter as seguintes variáveis

DB_HOST=IP OU NOME DO SEU HOST
DB_USER=USUARIO DO SEU HOST
DB_PASSWORD=SENHA DO SEU HOST
PORT=PORTA QUE O PROJETO IRÁ RODAR
DB_DATABASE=asterisk_routing

Para instalação, necessário instalar as dependências do projeto com o comando abaixo:

```bash
npm install
```

Também é necessário criar a base de dados que será utilizada:

```bash

CREATE DATABASE `asterisk_routing` /*!40100 COLLATE 'latin1_general_ci' */

CREATE TABLE `routes` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`trunk_name` VARCHAR(50) NOT NULL COLLATE 'latin1_general_ci',
	`regex` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'latin1_general_ci',
	`prepend` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_general_ci',
	`tn_tratado` VARCHAR(50) NOT NULL COLLATE 'latin1_general_ci',
	`status` VARCHAR(50) NOT NULL COLLATE 'latin1_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=5
;
```

## Execução

Para executar o projeto, utilize o comando abaixo, na raíz do projeto

```bash
node app.js
```

## Estrutura do Projeto

```bash
asterisk-dialplan/
│
├── config/
│   └── database.js     # Arquivo de configuração de conexão com banco de dados. A conexão com BD é realizada para verificar a tabela de roteamento
│
├── src/
│   ├── handlers/
│   │   └── agiHandler.js    # Manipulador de requisições AGI
│   │
│   └── routes/
│       └── routeHandler.js  # Lógica de roteamento das chamadas
│
├── .env            # Variáveis de ambiente. Os dados sobre o arquivo estão descritos abaixo
├── .gitignore      # Arquivo gitignore para ignorar arquivos irrelevantes para versionamento
├── package.json    # Dependências do projeto
├── README.md       # Arquivo com os detalhes necessários para executar o projeto, bem como dar manutenção caso necessário
└── app.js          # Arquivo principal que inicializa o servidor AGI
```

## Exemplos de dados

trunk_name: from-teste-api
regex:      .*319[1-9][0-9]{7}