angular.module("BeskidSlaski", [
    "mobile-angular-ui.fastclick",
    "mobile-angular-ui.directives.toggle",
    "mobile-angular-ui.directives.sidebars",
    "ngGeolocation"
]);

document.addEventListener("deviceready", function () {
    angular.bootstrap(document, ["BeskidSlaski"]);
}, false);
