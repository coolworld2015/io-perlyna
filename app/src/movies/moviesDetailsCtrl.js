(function () {
    'use strict';

    angular
        .module('app')
        .controller('MoviesDetailsCtrl', MoviesDetailsCtrl);

    MoviesDetailsCtrl.$inject = ['$state', '$rootScope', '$stateParams', '$ionicLoading', 'MoviesLocalStorage'];

    function MoviesDetailsCtrl($state, $rootScope, $stateParams, $ionicLoading, MoviesLocalStorage) {
        var vm = this;

        angular.extend(vm, {
            init: init,
			showSubmit: showSubmit,
			movieSubmit: movieSubmit,
			errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            vm.submitShowed = false;
        }

        function showSubmit() {
            vm.submitShowed = vm.submitShowed ? false : true;
        }
		
        function movieSubmit() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                name: vm.name,
                pic: vm.pic,
                plot: vm.plot,
                year: vm.year,
                genre: vm.genre,
                country: vm.country,
                actors: vm.actors,
                director: vm.director,
                runtime: vm.runtime,
                type: vm.type,
                imdbID: vm.imdbID,
                imdbRating: vm.imdbRating
            };

            try {
                MoviesLocalStorage.getItems();
                MoviesLocalStorage.addItem(item);
 				$ionicLoading.hide();
				$state.go('root.movies', {}, {reload: true});
             } catch (e) {
                errorHandler();
                alert(e);
            }
        }	

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }		
    }
})();
