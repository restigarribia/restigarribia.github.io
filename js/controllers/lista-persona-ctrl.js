/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
 app.controller('listaPersonaCtrl', ['$scope', '$rootScope', 'dataFactory',

     function ($scope, $rootScope, dataFactory) {
        /**
         * Array que contiene los datos de la visualización
         * @type Array
         * @field
         */
        $scope.data = {};
        $scope.data.lista = [];

        $scope.results = $rootScope.results;
        $scope.persona = $rootScope.persona;

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            //se realiza el get solo si no hay datos
            if ($scope.data.lista.length == 0) {
                getContacts();
            }
        })();

        function getContacts() {
            dataFactory.getContacts().then(function (response) {
              $scope.data = response.data;
            }, function (error) {
              window.alert("No se pudieron obtener los contactos.");
            });
        };

        $scope.buscarContacto = function(){
           var inicio = document.getElementById("inicio").value;
           var cantidad = document.getElementById("cantidad").value;
           var parametro = document.getElementById("parametro").value;

           dataFactory.searchContacts(inicio, cantidad, parametro).then(function (response) {
             $scope.results = angular.copy(response.data.lista);
             $rootScope.results = $scope.results;

             window.open("#agenda/resultados", '_self',false);
           }, function (error) {
             window.alert("No se pudieron obtener los contactos.");
           });
        };

        $scope.edit = function(item){
          $scope.persona = angular.copy(item);
          $rootScope.persona = $scope.persona;
          window.open("#agenda/"+item.id+"/editar", '_self',false);
	      };

        $scope.editContact = function (contact) {
           dataFactory.editContact(contact)
            .then(function (response) {
                getContacts();
                window.alert("¡Contacto modificado!");
                window.open("#personas/",'_self',false);
            }, function (error) {
                window.alert("Imposible modificar el contacto.");
            });
        };

        $scope.deleteContact = function (contact) {
          var result = window.confirm("¿Está seguro que desea borrar el contacto?");
          if(result == true){
            console.log(contact.id);
             dataFactory.deleteContact(contact).then(function (response) {
                  getContacts();
                  window.alert("¡Contacto elimindo!");
                  window.open("#personas/",'_self',false);
              }, function (error) {
                  window.alert("Imposible eliminar el contacto.");
              });
          } else {return false;}
        };

        $scope.getContact = function (contact) {
          dataFactory.getContact(contact.id)
          .then(function (response) {
            $scope.persona = angular.copy(response.data);
            $rootScope.persona = $scope.persona;
            window.open("#agenda/"+contact.id+"/ver", '_self',false);
          }, function (error) {
              window.alert("Imposible obtener el contacto.");
        });
    };
}]);
