(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('root', {
                url: '/root',
                abstract: true,
                templateUrl: 'app/root.html'
            })

            .state('root.home', {
                url: '/home',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-home': {
                        templateUrl: 'app/home.html'
                    }
                }
            })

            .state('root.map', {
                url: '/map',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-map': {
                        templateUrl: 'map/map.html',
                        controller: 'MapCtrl',
                        controllerAs: 'mapCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('root/map');
    }

})();