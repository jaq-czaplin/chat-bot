import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ChatBotService from './services/ChatBotService';

// konfiguracje dla serwera i usługi bota
const chat_boot_config = require('./config/chatbot.json');
const server_config = require('./config/server.json');

// ChatBot Service
const chatbot_service:ChatBotService = new ChatBotService( 
    new Map( chat_boot_config.answers_map ), 
    chat_boot_config.default_answer 
);

// Exress
const server:express.Application = express();

// Express: zezwól na requesty z innych domen
server.use( cors() );

// Express: parsuj request body jako JSON
server.use( bodyParser.json() );

// Express: enpoint Chat-Bota
server.post( '/api/chatboot', (req, res)=>{
    res.send( chatbot_service.answer( req.body.message ) );
} );

server.listen( server_config.port, ()=>{ 
    console.log( `ChatBoot uruchomiony na porcie ${server_config.port}` );
} );