# js-asterisk-dialplan

The js-ASterisk-Dialplan project was created by Felipe Santos, with the aim of facilitating call routing on Asterisk platforms. The project provides an API
for routing calls, enabling the customization of parameters, such as the destination number, for example.

## Installation

This project uses .env and because of this, it is necessary to create that file in the root folder. The file must have the following variables

```bash
DB_HOST=IP OU NOME DO SEU HOST
DB_USER=USUARIO DO SEU HOST
DB_PASSWORD=SENHA DO SEU HOST
PORT=PORTA QUE O PROJETO IRÁ RODAR
DB_DATABASE=asterisk_routing
```

For installation, you need to install the project dependencies with the command below:

```bash
npm install
```

It is also necessary to create the database that will be used:

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

## Running the project

To run the project, use the command below, in the project root

```bash
node app.js
```

## Project Structure

```bash
asterisk-dialplan/
│
├── config/
│   └── database.js    # Database connection configuration file. Connection to DB is performed to check the routing table
│
├── src/
│   ├── handlers/
│   │   └── agiHandler.js    # AGI request handler
│   │
│   └── routes/
│       └── routeHandler.js  # Call routing logic
│
├── .env            # Environment variables. Data about the file is described below
├── .gitignore      # Gitignore file to ignore irrelevant files for versioning
├── package.json    # Project dependencies
├── README.md       # File with the details necessary to execute the project, as well as provide maintenance if necessary
└── app.js          # Main file that initializes the AGI server
```

## Data Example

```bash
trunk_name: from-teste-api
regex:      .*319[1-9][0-9]{7}
```

LICENSE: MIT
