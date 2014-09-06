(function () {
    'use strict';

    var angular = window.angular;

    angular.module('nx.data')
        .factory('nxDataSource', function (nxLog) {
            return function (config) {
                var isLoading = false,
                    items = [],
                    totalItemCount = 200,
                    pageSizeOptions = [10, 25, 50, 100, 250, 500],
                    defaultPageSize = 25,
                    pageSize = 25,
                    pageNo = 0,
                    positionJson = null,
                    ret,
                    loadData;
;

                ret = {
                    hasPrevious: function () {
                        return (pageNo > 0);
                    },
                    hasNext: function () {
                        return (pageNo < this.getTotalPageCount() - 1);
                    },
                    moveToPage: function (pageNo) {
                        loadData(pageNo, pageSize);
                    },
                    moveFirst: function () {
                        this.moveToPage(0);
                    },
                    movePrevious: function () {
                        this.moveToPage(pageNo - 1);
                    },
                    moveNext: function () {
                        this.moveToPage(pageNo + 1);
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
                        return pageSize;
                    },
                    getPageNo: function () {
                        return pageNo;
                    },
                    getTotalPageCount: function () {
                        return Math.ceil(totalItemCount / pageSize);
                    },
                    getTotalItemCount: function () {
                        return totalItemCount;
                    },
                    getItemCount: function () {
                        return items.length;
                    },
                    getItems: function () {
                        return items;
                    },
                    setDefaultPageSize: function (value) {
                        defaultPageSize = value;
                    },
                    getDefaultPageSize: function () {
                        return defaultPageSize;
                    },
                    setCurrentPageSize: function (value) {
                        pageSize = value;
                    },
                    setPageSizeOptions: function (values) {
                        pageSizeOptions = values;
                    },
                    getPageSizeOptions: function () {
                        return pageSizeOptions;
                    },
                    getPosition: function () {
                        return {
                            pageNo: pageNo,
                            pageSize: pageSize,
                            totalPageCount: ret.totalPageCount
                        };
                    },
                    getPositionJson: function () {
                        return positionJson;
                    }
                };

                loadData = function (newPageNo, itemCountPerPage) {
                    var totalPageCount = ret.getTotalPageCount(),
                        onSuccess;
                    newPageNo = parseInt(newPageNo, 10);

                    if (newPageNo >= totalPageCount) {
                        newPageNo = totalPageCount - 1;
                    }


                    if (newPageNo >= 0 && newPageNo < totalPageCount) {
                        onSuccess = function (data) {
                            pageSize = itemCountPerPage;
                            pageNo = newPageNo;
                            totalItemCount = data.totalItemCount;
                            items = data.items;

                            positionJson = angular.toJson(ret.getPosition());
                        };

                        var onError = function (data) {
                            alert('error');
                        };

                        config.fetcher(pageNo, itemCountPerPage, onSuccess, onError);
                    }
                };

                return ret;
            };
        });
}());
