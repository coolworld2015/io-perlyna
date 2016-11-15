(function () {
    'use strict';

    angular
        .module('app')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', '$state', '$ionicLoading'];

    function MapCtrl($scope, $state, $ionicLoading) {
        var vm = this;

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: new google.maps.LatLng(49.5443047, 31.8691583),
            //mapTypeId: google.maps.MapTypeId.ROADMAP
            mapTypeId: google.maps.MapTypeId.SATELLITE
        });

        var symbolOne = {
            path: 'M -2,0 0,-2 2,0 0,2 z',
            strokeColor: 'red',
            fillColor: 'red',
            fillOpacity: 1,
            scale: 3
        };

        var goldStar = {
            path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            fillColor: 'yellow',
            fillOpacity: 0.8,
            scale: 2,
            strokeColor: 'gold',
            strokeWeight: 14
        };

        var image = 'no-img.png';

		var locations = [
			['<div style1="margin: 0px; background: #00FFFF; "><img src="logo.jpg" style="margin: 15px;"><b>Перлина Резорт</b></div>', 49.5443047, 31.8691583, 1],
			['А это - ЛЕС', 49.5444189, 31.8661804, 2],
			['А это - <b>ПЛАВНИ</b>', 49.5489871, 31.8649385, 3]
		];

        var infowindow = new google.maps.InfoWindow();
        var marker, marker1;

        angular.extend(vm, {
            showSearch: showSearch,
            itemsSearch: itemsSearch,
            doRefresh: doRefresh,
            init: init
        });

        init();

        function showSearch() {
            vm.searchShowed = vm.searchShowed ? false : true;
        }

        function itemsSearch() {
            getPos();
        }

        function doRefresh() {
            init();
            $scope.$broadcast('scroll.refreshComplete');
        }

        function getPos() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, onMapError, {
                    maximumAge: 300000,
                    timeout: 10000,
                    enableHighAccuracy: true
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

        function showPosition(position) {
            if (marker1) {
                marker1.setMap(null);
            }

            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            //lat = 49.544000;
            //lng = 31.863000;

            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: new google.maps.LatLng(lat, lng),
                mapTypeId: google.maps.MapTypeId.SATELLITE
            });

            map.setCenter(new google.maps.LatLng(lat, lng));

            marker1 = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                draggable: true,
                icon: symbolOne,
                map: map
            });

            for (var i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map
                });

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }

        function onMapError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        function init() {
            vm.searchShowed = true;
            vm.marker1 = '';

            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: new google.maps.LatLng(49.5443047, 31.8691583),
                mapTypeId: google.maps.MapTypeId.SATELLITE
            });

            for (var i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    //icon: {
                    //path: google.maps.SymbolPath.CIRCLE,
                    //path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    //path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    //scale: 3
                    //},
                    //draggable: true,
                    //animation: google.maps.Animation.BOUNCE,
                    //icon: image,
                    //icon: symbolOne,
                    map: map
                });

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
    }
})();