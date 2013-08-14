describe('BaseControllerTests', function () {
    var scope;
    var pageNav;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller, pageNavFactory) {
        scope = $rootScope.$new();
        pageNav = pageNavFactory;
        spyOn(pageNav, 'slidePage');
        spyOn(scope, '$$phase');
        $controller('BaseController', {
            $scope: scope,
            pageNavFactory: pageNav
        });
    }));

    it("slidePage should call Slidepage on pagenav factory", function () {
        scope.changePage("DummyPath");
        expect(pageNav.slidePage).toHaveBeenCalledWith("DummyPath", MobileNavTransitions.slide);
    });
});
