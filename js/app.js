angular.module('OurTeas', [])

.controller('ProductsController', function ($scope, $http) {
    var list = this;
    list.selected = 0;

    $http.get('../js/teaList.json').success(function (data) {
        list.products = data;
    });


    function configElements () {
        for (tea in list.products) {

        }
    }

    $scope.printSelec = function() {
        console.log(list.selected);
    }


    setTimeout( function(){console.log(list.products)}, 10 );
});
