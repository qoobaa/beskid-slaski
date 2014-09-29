angular.module("BeskidSlaski")

    .controller("BeskidSlaskiController", function ($scope, $materialSidenav, $geolocation) {
        $scope.layers = {
            position: false,
            peaks: false,
            shelters: false,
            paths: false
        };

        $scope.toggleLeft = function() {
            $materialSidenav("left").toggle();
        };

        $scope.$watch("layers.position", function (visible) {
            if (visible) {
                $scope.watchId = $geolocation.watchPosition({ enableHighAccuracy: true });
            } else {
                $geolocation.clearWatch($scope.watchId);
            }
        });

        $scope.position = $geolocation.position.coords;
    });
