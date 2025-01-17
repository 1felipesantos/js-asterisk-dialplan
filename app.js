const AGIServer = require("ding-dong");
const dotenv = require("dotenv");
const agiHandler = require("./src/handlers/agiHandler");

dotenv.config();

const port = process.env.PORT;

const agi = new AGIServer(agiHandler, { debug: false });
agi.start(port);

console.log("---------------------------------------------------");
console.log(`              AGI Server Iniciado na porta ${port}  `);
console.log("---------------------------------------------------");