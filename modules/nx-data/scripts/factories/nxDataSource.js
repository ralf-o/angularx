(function () {
    'use strict';

    var angular = window.angular;

    angular.module('nx.data')
        .factory('nxDataSource', function () {
            return function (config) {
                var isLoading = false,
                    currentItems = [],
                    totalItemCount = 200,
                    pageSizeOptions = [10, 25, 50, 100, 250, 500],
                    defaultPageSize = 25,
                    currentPageSize = 25,
                    currentPageNo = 0,
                    ret,
                    loadData;

                ret = {
                    hasPrevious: function () {
                        return (currentPageNo > 0);
                    },
                    hasNext: function () {
                        return (currentPageNo < this.getTotalPageCount());
                    },
                    moveToPage: function (pageNo) {
                        loadData(pageNo, currentPageSize);
                    },
                    moveFirst: function () {
                        this.moveToPage(0);
                    },
                    movePrevious: function () {
                        this.moveToPage(currentPageNo - 1);
                    },
                    moveNext: function () {
                        this.moveToPage(currentPageNo + 1);
                    },
                    moveLast: function () {
                        this.moveToPage(this.getTotalPageCount() - 1);
                    },
                    isLoading: function () {
                        return isLoading;
                    },
                    setPageSize: function (value) {
                        loadData(0, value);
                    },
                    getPageSize: function () {
                        return currentPageSize;
                    },
                    getCurrentPageNo: function () {
                        return currentPageNo;
                    },
                    getTotalPageCount: function () {
                        return Math.ceil(totalItemCount / currentPageSize);
                    },
                    getTotalItemCount: function () {
                        return totalItemCount;
                    },
                    getCurrentItemCount: function () {
                        return currentItems.length;
                    },
                    getCurrentItems: function () {
                        return currentItems;
                    },
                    setDefaultPageSize: function (value) {
                        defaultPageSize = value;
                    },
                    getDefaultPageSize: function () {
                        return defaultPageSize;
                    },
                    setCurrentPageSize: function (value) {
                        currentPageSize = value;
                    },
                    getCurrentPageSize: function () {
                        return currentPageSize();
                    },
                    setPageSizeOptions: function (values) {
                        pageSizeOptions = values;
                    },
                    getPageSizeOptions: function () {
                        return pageSizeOptions;
                    }
                };

                loadData = function (pageNo, itemCountPerPage) {
                    var onSuccess = function (data) {
                        currentPageSize = itemCountPerPage;
                        currentPageNo = pageNo;
                        totalItemCount = data.totalItemCount;
                        currentItems = data.items;
                    };

                    var onError = function (data) {
                        alert('error');
                    };

                    config.fetcher(pageNo, itemCountPerPage, onSuccess, onError);
                };

                return ret;
            };
        });
}());
