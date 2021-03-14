(function( angular, undefined ){

    let ChatBot = angular.module( 'ChatBot', ['ChatBot.config','luegg.directives'] );

    // Dyrektywa wykryje uzycie przycisku ENTER
    ChatBot.directive( 'onEnter', () => {
        return function ($scope, element, attrs) {
            element.bind( 'keydown keypress', function (event) {
                if( event.keyCode === 13 ) {
                    event.preventDefault();
                    $scope.$apply( function () {
                        $scope.$eval( attrs.onEnter );
                    } );
                }
            } );
        };
    } );

    // Chat Controler
    ChatBot.controller( 'chat', 
        [ '$scope', '$http', 'api', 'info', 
        ( $scope, $http, api, info ) => {

        $scope.info = info;

        // Domyślna, "powitalna" wiadomość na chacie
        $scope.messages = [
            { text: 'Witaj. Zapraszam do rozmowy z Chat-Botem', author: 'admin' }
        ];

        //$scope.message = null;

        $scope.send = function(){

            if( $scope.message ){

                $scope.messages.push( { text: $scope.message, author: 'client' } );

                $http.post( api.CHATBOT_ENDPOINT, { message: $scope.message } )
                    .then( on_chatboot_response_done, on_chatboot_response_fail );

                $scope.message = null;

            }

        }
        
        function on_chatboot_response_done( response ){
            $scope.messages.push( { text: response.data, author: 'server' } )
        }
        function on_chatboot_response_fail( response ){
            console.log( err );
        }

    } ] );

})( angular );