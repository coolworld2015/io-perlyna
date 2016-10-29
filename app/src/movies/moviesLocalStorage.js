(function () {
    'use strict';

    angular
        .module('app')
        .factory('MoviesLocalStorage', MoviesLocalStorage);

    function MoviesLocalStorage() {
        return {
            items: [],
            numPerPage: 10,

            getItems: getItems,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            setItems: setItems,

            uploadItems: uploadItems,
            findByName: findByName,
            _sort: sort
        };

        function getItems() {
            if (MoviesLocalStorage.items === undefined) {
                var items = localStorage.getItem('ui-movies.items');
                items = JSON.parse(items);
                MoviesLocalStorage.items = items;
            }

            if (MoviesLocalStorage.items === null) {
                MoviesLocalStorage.items = [];
            }

            return MoviesLocalStorage.items.sort(sort);
        }

        function addItem(item) {
            MoviesLocalStorage.items.push(item);
            setItems();
        }

        function editItem(item) {
            var items = MoviesLocalStorage.items;
            for (var i = 0; i < items.length; i++) {
                if (items[i].id == item.id) {
                    items.splice(i, 1, item);
                    setItems();
                    break;
                }
            }
        }

        function deleteItem(id) {
            var items = MoviesLocalStorage.items;
            for (var i = 0; i < items.length; i++) {
                if (items[i].id == id) {
                    items.splice(i, 1);
                    setItems();
                    break;
                }
            }
        }

        function setItems() {
            localStorage.setItem('ui-movies.items', JSON.stringify(MoviesLocalStorage.items));
        }

        function uploadItems(items) {
            localStorage.setItem('ui-movies.items', JSON.stringify(items));
            MoviesLocalStorage.items = undefined;
        }

        function findByName(name) {
            getItems();
            var items = MoviesLocalStorage.items;
            var results = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].name.toUpperCase().indexOf(name.toUpperCase()) > -1) {
                    results.push(items[i]);
                }
            }
            return results;
        }

        function sort(a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0;
        }
    }
})();
