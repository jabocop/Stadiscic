var BaseController = (function () {
    function BaseController($scope, pageNavFactory) {
        var _this = this;
        this.pageNavFactory = pageNavFactory;
        this.baseScope = $scope;
        $scope.changePage = function (path) {
            return _this.changePage(path);
        };
        $scope.navigateBack = function () {
            return _this.navigateBack();
        };
        $scope.$on('$routeChangeSuccess', function (event, current, previous) {
            if (current.$$route === undefined) {
                $scope.title = '';
            } else {
                var tmpTitle = current.$$route.title;
                if (current.params.holeIndex !== undefined) {
                    tmpTitle = tmpTitle.replace('{$hole$}', current.params.holeIndex);
                }
                $scope.title = tmpTitle;
            }
        });
    }
    BaseController.prototype.changePage = function (path) {
        this.pageNavFactory.slidePage(path, MobileNavTransitions.slide);
        this.safeApply();
    };

    BaseController.prototype.navigateBack = function () {
        this.pageNavFactory.back();
        this.safeApply();
    };

    BaseController.prototype.safeApply = function () {
        if (!this.baseScope.$$phase) {
            this.baseScope.$apply();
        }
    };
    return BaseController;
})();
