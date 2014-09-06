(function () {
    'use strict';

    var angular = window.angular;

    function Logger(name) {
        this._name = name;

        this.error = function (msg) {
            alert(msg);
        };
    }

    function Log() {
        this.getLogger = function (name) {
            return new Logger(name);
        };
    }

    Log.prototype = new Logger('main');

    angular.module('nx.util')
        .service('nxLog', Log);
}());
