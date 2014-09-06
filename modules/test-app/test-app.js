(function () {
    'use strict';

    var angular = window.angular;

    angular.module('testApp', ['nx.data', 'nx.ui'])
        .controller('MainCtrl',
            ['$scope', 'nxDataSource', function ($scope, nxDataSource) {
                $scope.ds = nxDataSource({
                    fetcher: function (pageNo, pageSize, onSuccess, onError) {
                        var items = [],
                            i;

                        for (i = 0; i < pageSize; ++i) {
                            items.push(pageNo * pageSize + i + 1);
                        }

                        onSuccess({
                            items: items,
                            totalItemCount: 200
                        });
                    }
                });

                $scope.buttonGroupConfig = {
                    buttons: [{
                        title: 'New'
                    }, {
                        title: 'Save'
                    }, {
                        title: 'Export',
                        menu: [{
                            title: 'CSV'
                        }, {
                            title: 'Excel'
                        }]
                    }]
                };
            }]);
}());