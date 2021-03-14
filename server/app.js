"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var ChatBotService_1 = __importDefault(require("./services/ChatBotService"));
// konfiguracje dla serwera i usługi bota
var chat_boot_config = require('./config/chatbot.json');
var server_config = require('./config/server.json');
// ChatBot Service
var chatbot_service = new ChatBotService_1.default(new Map(chat_boot_config.answers_map), chat_boot_config.default_answer);
// Exress
var server = express_1.default();
// Express: zezwól na requesty z innych domen
server.use(cors_1.default());
// Express: parsuj request body jako JSON
server.use(body_parser_1.default.json());
// Express: enpoint Chat-Bota
server.post('/api/chatboot', function (req, res) {
    res.send(chatbot_service.answer(req.body.message));
});
server.listen(server_config.port, function () {
    console.log("ChatBoot uruchomiony na porcie " + server_config.port);
});
