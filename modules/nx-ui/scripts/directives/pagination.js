(function () {
    'use strict';

    var angular = window.angular;

    angular.module('nx.ui')
        .directive('nxPagination', function () {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: 'modules/nx-ui/templates/pagination.html',
                scope: {
                    dataSource: "=datasource"
                },
                link: function (scope, elem, attrs) {
                    var dataSource = scope.dataSource;

                    attrs.$observe('type', function (type) {
                        switch (type) {
                            case 'pageInfo':
                            case 'itemsInfo':
                            case 'pageSizeSelectBox':
                            case 'pageSizeButtons':
                            case 'pageSizeDropdown':
                            case 'pageSizeDropup':
                            case 'pageNavigator':
                            case 'pager':
                            case 'previousButton':
                            case 'nextButton':
                            case 'firstAndPreviousButton':
                            case 'nextAndLastButton':
                                scope.type = type;
                                break;

                            default:
                                scope.type = 'paginator';
                        }

                        scope.dataSource = dataSource;
                    });

                    var getPages = function () {
                        var ret = [0];

                        var firstMiddlePageNumber = null,
                            lastMiddlePageNumber = null,
                            pageCount = dataSource.getTotalPageCount(),
                            pageNumber = dataSource.getPageNo() + 1,
                            pageButtonCount = 6; // Default value

                        pageButtonCount = Math.min(pageButtonCount, pageCount);

                        if (pageButtonCount === pageCount || pageNumber <= Math.round(pageButtonCount / 2)) {
                            firstMiddlePageNumber = 2;
                        } else if (pageCount - pageNumber < Math.round(pageButtonCount / 2)) {
                            firstMiddlePageNumber = pageCount - pageButtonCount + 2;
                        } else {
                            firstMiddlePageNumber = pageNumber - Math.round(pageButtonCount / 2) + 2;
                        }

                        lastMiddlePageNumber = firstMiddlePageNumber + pageButtonCount - 3;

                        for (var i = firstMiddlePageNumber; i <= lastMiddlePageNumber; ++i) {
                            ret.push(i - 1);
                        }
        
                        ret.push(dataSource.getTotalPageCount() - 1);
//                        console.debug(firstMiddlePageNumber, lastMiddlePageNumber, scope.pageNos)
                        return ret;
                    };
                    
                    scope.$watch(function () {
                        return dataSource.getPositionJson();
                    }, function () {
                        scope.pageNos = getPages();
                    });
                }
            };
        });
}());

