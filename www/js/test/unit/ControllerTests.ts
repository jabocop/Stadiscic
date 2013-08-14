/// <reference path='../../Factories/PageNavFactory.ts' />
/// <reference path='../../Controllers/BaseController.ts' />
/// <reference path='_all_unittests.d.ts' />

describe('BaseControllerTests', () => {
    var scope: BaseScope;
    var pageNav: PageNavFactory;
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

   

    it("slidePage should call Slidepage on pagenav factory", () => {
        scope.changePage("DummyPath");
        expect(pageNav.slidePage).toHaveBeenCalledWith("DummyPath", MobileNavTransitions.slide);
    });

});