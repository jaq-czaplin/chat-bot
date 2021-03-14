"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var latinize_1 = __importDefault(require("latinize"));
var ChatBotService = /** @class */ (function () {
    function ChatBotService(answers_map, // mapa Pytań => Odpowiedzi
    default_answer // domyślna odpowiedź
    ) {
        this.answers_map = answers_map;
        this.default_answer = default_answer;
        this.answers_map = this._normalize_map(answers_map); // normalizuj mapę
        console.log("Mapa pytań => Odpowiedzi", this.answers_map); // wyświetl mapę
    }
    // Odpowiedz na pytanie
    ChatBotService.prototype.answer = function (question) {
        return this.answers_map.get(this._normalize_string(question)) || this.default_answer;
    };
    // normalizuj tekst
    ChatBotService.prototype._normalize_string = function (str) {
        return str ? latinize_1.default(str) // konwertuj polskie znaki i inne diaktryki na znaki łacińskie
            .toUpperCase() // ujednolić wielkość znaków
            .replace(/[^A-Za-z0-9\s]+/g, ' ') // usuń znaki specjalne
            .trim().replace(/\s+/g, ' ') // usuń nadmiarowe spacje
            : str;
    };
    // normalizuję kolumnę pytań w mapie Pytań-Odpowiedzi
    ChatBotService.prototype._normalize_map = function (input) {
        var _this = this;
        var output = new Map();
        // normalizuj każdy klucz (pytanie) w mapie
        input.forEach(function (v, k) {
            output.set(_this._normalize_string(k), v);
        });
        return output;
    };
    return ChatBotService;
}());
exports.default = ChatBotService;
