var Zoom = L.Control.Zoom.extend({
    onAdd: function (map) {
        var container = this.constructor.__super__.onAdd.apply(this, arguments);
        L.DomEvent.disableClickPropagation(container);
        return container;
    }
});

var Layers = L.Control.Layers.extend({
    onAdd: function (map) {
        var container = this.constructor.__super__.onAdd.apply(this, arguments);
        L.DomEvent.disableClickPropagation(container);
        return container;
    }
});

var app = {
    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
        navigator.geolocation.watchPosition(
            this.onWatchPositionSuccess.bind(this),
            this.onWatchPositionError.bind(this),
            { enableHighAccuracy:true }
        );
    },

    onDeviceReady: function () {
        this.map = this.createMap();

        this.baseLayer = this.createBaseLayer().addTo(this.map);
        this.attribution = this.createAttribution().addTo(this.map);
        this.zoom = new Zoom().addTo(this.map);
        this.scale = this.createScale().addTo(this.map);

        this.layersControl = new Layers({}, {
            "Szczyty": this.createPeaksLayer(),
            "Schroniska": this.createSheltersLayer(),
            "Szlaki": this.createPathsLayer()
        }).addTo(this.map);
    },

    createMap: function () {
        return L.map("map", {
            center: L.latLng(49.707493, 19.013193),
            zoom: 11,
            minZoom: 11,
            maxZoom: 14,
            maxBounds: L.latLngBounds(L.latLng(49.3847, 18.7334), L.latLng(49.8013, 19.2443)),
            zoomControl: false,
            attributionControl: false
        });
    },

    createBaseLayer: function () {
        return L.tileLayer("img/tiles/{z}/{x}/{y}.png");
    },

    createPeaksLayer: function () {
        return L.geoJson.ajax("geo/peaks.json", {
 	    pointToLayer: function (feature, latLng) {
                var icon = L.icon({ iconUrl: "img/peak.png", iconSize: [8, 8], iconAnchor: [4, 4] }),
                    layer = L.marker(latLng, { icon: icon });

                layer.bindPopup(feature.properties.name);

                return layer;
            }
        });
    },

    createSheltersLayer: function () {
        return L.geoJson.ajax("geo/shelters.json", {
 	    pointToLayer: function (feature, latLng) {
                var icon = L.icon({ iconUrl: "img/shelter.png", iconSize: [16, 16], iconAnchor: [8, 8] }),
                    layer = L.marker(latLng, { icon: icon });

                layer.bindPopup(feature.properties.name);

                return layer;
            }
        });
    },

    createPathsLayer: function () {
        return L.geoJson.ajax("geo/paths.json", {
            onEachFeature: function (feature, layer) {
                var popup = ""
                        + feature.properties.name + "<br>"
                        + "Czas przejścia: " + feature.properties.times + "<br>"
                        + "Dystans: " + feature.properties.distance + " km";

                layer.setStyle({
                    opacity: 1,
                    color: feature.properties.colors[0]
                });

                layer.bindPopup(popup);
            }
        });
    },

    createAttribution: function () {
        return L.control.attribution({ prefix: false }).addAttribution('&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors');
    },

    createScale: function () {
        return L.control.scale({ imperial: false, position: "bottomright" });
    },

    onWatchPositionSuccess: function (position) {
        var latLng = L.latLng(position.coords.latitude, position.coords.longitude);

        if (this.marker) {
            this.marker.setLatLng(latLng);
        } else {
            this.marker = L.circleMarker(latLng, {
                opacity: 1,
                color: "#000000",
                weight: 1,
                fillOpacity: 1,
                fillColor: "#35b3e5",
                radius: 5
            });
            if (this.map) {
                this.map.addLayer(this.marker);
            }
        }
    },

    onWatchPositionError: function (error) {
        alert("Wystąpił błąd podczas określania położenia\n" +
              "kod błędu: "    + error.code    + "\n" +
              "komunikat: " + error.message + "\n");
    }
};
