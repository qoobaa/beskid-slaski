angular.module("BeskidSlaski")

    .directive("bsLeaflet", function ($parse) {
        return {
            restrict: "E",
            scope: {
                menuClick: "&",
                layers: "=",
                position: "="
            },
            link: function (scope, element, attributes) {
                var map, marker, base, peaks, shelters, paths, button, attribution, scale, zoom;

                map = L.map(element[0], {
                    center: L.latLng(49.707493, 19.013193),
                    zoom: 11,
                    minZoom: 11,
                    maxZoom: 14,
                    maxBounds: L.latLngBounds(L.latLng(49.3847, 18.7334), L.latLng(49.8013, 19.2443)),
                    zoomControl: false,
                    attributionControl: false
                });

                base = L.tileLayer("img/tiles/{z}/{x}/{y}.png");

                marker = L.marker([0, 0], { icon: L.icon({ iconUrl: "img/marker.png", iconSize: [16, 16], iconAnchor: [8, 8] }) });

                peaks = L.geoJson.ajax("geo/peaks.json", {
 	            pointToLayer: function (feature, latLng) {
                        var icon = L.icon({ iconUrl: "img/peak.png", iconSize: [32, 32], iconAnchor: [16, 16] }),
                            layer = L.marker(latLng, { icon: icon });

                        layer.bindPopup(feature.properties.name);

                        return layer;
                    }
                });

                shelters = L.geoJson.ajax("geo/shelters.json", {
 	            pointToLayer: function (feature, latLng) {
                        var icon = L.icon({ iconUrl: "img/shelter.png", iconSize: [32, 32], iconAnchor: [16, 16] }),
                            layer = L.marker(latLng, { icon: icon });

                        layer.bindPopup(feature.properties.name);

                        return layer;
                    }
                });

                paths = L.geoJson.ajax("geo/paths.json", {
                    onEachFeature: function (feature, layer) {
                        var popup = "<br>"
                                + feature.properties.name + "<br>"
                                + "Czas przejścia: " + feature.properties.times + "<br>"
                                + "Dystans: " + feature.properties.distance + " km";

                        feature.properties.colors.forEach(function (color) {
                            popup = ""
                                + "<div class='path'><div style='background: " + color + ";'></div></div>&nbsp;"
                                + popup;
                        });

                        layer.setStyle({
                            opacity: 1,
                            color: feature.properties.colors[0]
                        });

                        feature.properties.colors.slice(1).forEach(function (color, i) {
                            var additionalPath = L.polyline(layer.getLatLngs(), {
                                opacity: 1,
                                color: color,
                                className: "path-" + (i + 1)
                            });

                            additionalPath.bindPopup(popup);
                            paths.addLayer(additionalPath);
                        });

                        layer.bindPopup(popup);
                    }
                });

                base.addTo(map);

                button = L.easyButton("icon-material-menu", function () {
                    scope.$apply(scope.menuClick);
                }, "Toggle Menu", map);

                attribution = L.control.attribution({ prefix: false, position: "bottomleft" }).addAttribution('&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors').addTo(map);
                scale = L.control.scale({ imperial: false, position: "bottomright" }).addTo(map);
                zoom = L.control.zoom({ position: "topright" }).addTo(map);

                scope.$watch("layers.position", function (visible) {
                    visible ? map.addLayer(marker) : map.removeLayer(marker);
                });

                scope.$watch("layers.peaks", function (visible) {
                    visible ? map.addLayer(peaks) : map.removeLayer(peaks);
                });

                scope.$watch("layers.shelters", function (visible) {
                    visible ? map.addLayer(shelters) : map.removeLayer(shelters);
                });

                scope.$watch("layers.paths", function (visible) {
                    visible ? map.addLayer(paths) : map.removeLayer(paths);
                });

                scope.$watchGroup(["position.latitude", "position.longitude"], function (position) {
                    if (position[0] !== undefined && position[1] !== undefined) {
                        marker.setLatLng(position);
                    }
                });
            }
        };
    });
