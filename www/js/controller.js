angular.module("BeskidSlaski")

    .controller("BeskidSlaskiController", function ($scope) {
        $scope.layers = {
            peaks: false,
            shelters: false,
            paths: false
        };

        $scope.toggleLayer = function (layer) {
            $scope.layers[layer] = !$scope.layers[layer];
        };
    });
