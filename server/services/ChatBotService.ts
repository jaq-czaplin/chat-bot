import latinize from 'latinize';


export default class ChatBotService {

    constructor( 
        private answers_map:Map<string,string>, // mapa Pytań => Odpowiedzi
        private default_answer:string           // domyślna odpowiedź
    ){
        this.answers_map = this._normalize_map( answers_map );    // normalizuj mapę
        console.log( "Mapa pytań => Odpowiedzi", this.answers_map );    // wyświetl mapę
    }

    // Odpowiedz na pytanie
    public answer( question:string ):string {
        return this.answers_map.get( this._normalize_string( question ) ) || this.default_answer;
    }

    // normalizuj tekst
    private _normalize_string( str:string ):string {
        return str ? latinize( str )            // konwertuj polskie znaki i inne diaktryki na znaki łacińskie
            .toUpperCase()                      // ujednolić wielkość znaków
            .replace(/[^A-Za-z0-9\s]+/g,' ')    // usuń znaki specjalne
            .trim().replace(/\s+/g,' ')         // usuń nadmiarowe spacje
            : str;    
    }

    // normalizuję kolumnę pytań w mapie Pytań-Odpowiedzi
    private _normalize_map( input:Map<string,string> ):Map<string,string> {

        let output = new Map<string,string>();

        // normalizuj każdy klucz (pytanie) w mapie
        input.forEach( ( v:string, k:string ) => {
            output.set( this._normalize_string( k ) , v );
        } );

        return output;

    }

}