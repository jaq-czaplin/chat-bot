(function( angular, undefined ){

    angular.module( 'ChatBot.config', [] )
        .constant( 'info', {
            'CHATBOT_NAME':'Chat-Boot',
            'CHATBOT_AUTHOR':'Jacek Czapliński-Czaja',
            'CHATBOT_VERSION':'1.0',
        } )
        .constant( 'api', {
            'CHATBOT_ENDPOINT':'http://localhost:3030/api/chatboot',
        } );

})( angular );