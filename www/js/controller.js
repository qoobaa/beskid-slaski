angular.module("BeskidSlaski")

    .controller("BeskidSlaskiController", function ($scope, $geolocation) {
        $scope.layers = {
            position: false,
            peaks: false,
            shelters: false,
            paths: false
        };

        $scope.toggleLayer = function (layer) {
            $scope.layers[layer] = !$scope.layers[layer];

            if (layer === "position") {
                if ($scope.layers.position) {
                    $scope.watchId = $geolocation.watchPosition({ enableHighAccuracy: true });
                } else {
                    $geolocation.clearWatch($scope.watchId);
                }
            }
        };

        $scope.position = $geolocation.position.coords;
    });
