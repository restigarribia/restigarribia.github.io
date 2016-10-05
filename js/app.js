/**
 * Enrutador de la aplicación
 */
var app = angular.module('pwfApp', ['ngRoute']);

// configure our routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/personas', {
            templateUrl: 'views/lista-persona-partial.html',
            controller: 'listaPersonaCtrl'
        })

        .when('/agenda/:id/editar', {
            templateUrl: 'views/edit.html',
            controller: 'listaPersonaCtrl',
            method: 'edit'
        })

        .when('/agenda/:id/ver', {
            templateUrl: 'views/view.html',
            controller: 'listaPersonaCtrl',
            method: 'view'
        })

        .when('/agenda/resultados', {
            templateUrl: 'views/results.html',
            controller: 'listaPersonaCtrl',
        })

        .when('/', {
            templateUrl: 'views/formulario-persona-partial.html',
            controller: 'formularioPersonaCtrl'
        });
});

/**
 * Variable compartida entre los controladores. se utiliza para añadir
 * elementos a la lista de personas.
 */
app.factory('dataFactory', ['$http', function($http) {
    var urlBase = 'https://desa03.konecta.com.py/pwf/rest/agenda';
    var dataFactory = {};
    dataFactory.getContacts = function () {
        return $http.get(urlBase);
    };

    dataFactory.getContact = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.searchContacts = function (inicio, cantidad, parametro) {
        return $http.get(urlBase + "?inicio="+ inicio + "&cantidad=" + cantidad + '&filtro=' + parametro);
    };

    dataFactory.editContact = function (item) {
        return $http.put(urlBase + '/' + item.id, item);
    };

    dataFactory.deleteContact = function (item) {
        return $http.delete(urlBase + '/' + item.id);
    };

    dataFactory.insertContact = function (item) {
        return $http.post(urlBase, item);
    };

    return dataFactory;
}]);
