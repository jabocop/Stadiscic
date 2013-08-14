/// <reference path='../../js/Factories.ts' />
/// <reference path='_all_unittests.d.ts' />
describe("PageNavFactory tests", function () {
    var dummyNav;
    var factory;
    beforeEach(function () {
        dummyNav = jasmine.createSpyObj('dummyNav', ['go', 'back']);
        factory = new PageNavFactory(dummyNav);
    });
    it("SlidePage with modal transition should call go with correct parameters", function () {
        factory.slidePage("", MobileNavTransitions.modal);
        expect(dummyNav.go).toHaveBeenCalledWith("", MobileNavTransitions.modal.toString());
    });
    it("SlidePage with slide transition should call go with correct parameters", function () {
        factory.slidePage("", MobileNavTransitions.slide);
        expect(dummyNav.go).toHaveBeenCalledWith("", MobileNavTransitions.slide.toString());
    });
});
//@ sourceMappingURL=FactoriesTests_old.js.map
