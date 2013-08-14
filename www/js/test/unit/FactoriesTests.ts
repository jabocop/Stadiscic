/// <reference path='../../Factories/PageNavFactory.ts' />
/// <reference path='../../Factories/RoundFactory.ts' />
/// <reference path='../../Models/CourseModel.ts' />
/// <reference path='_all_unittests.d.ts' />

describe("PageNavFactory tests", () => {
    var dummyNav;
    var factory: PageNavFactory;
    beforeEach(() => {
        dummyNav = jasmine.createSpyObj('dummyNav', ['go', 'back']);
        factory = new PageNavFactory(dummyNav);
    });
    it("SlidePage with modal transition should call go with correct parameters", () => {
        factory.slidePage("", MobileNavTransitions.modal);
        expect(dummyNav.go).toHaveBeenCalledWith("", MobileNavTransitions.modal.toString());
    });
    it("SlidePage with slide transition should call go with correct parameters", () => {
        factory.slidePage("", MobileNavTransitions.slide);
        expect(dummyNav.go).toHaveBeenCalledWith("", MobileNavTransitions.slide.toString());
    });
});

describe("RoundFactory tests", () => {
    var course: CourseSaveObject;
    var factory: RoundFactory;
    beforeEach(() => {
        course = new CourseSaveObject("KEY", "NAME", null);
        factory = new RoundFactory();
        spyOn(AuId, 'generateKey').andCallThrough();
        factory.InitilizeNewRound(course);
    });
    it("New round should be properly initlized", () => {
        expect(AuId.generateKey).toHaveBeenCalled();
        expect(factory.course).toBe(course);
        expect(factory.players.length).toBe(0);
    });

    it("Should add a new player", () => {
        factory.addPlayer(new PlayerSaveObject("PLAYER_KEY", "PLAYER"));
        expect(factory.players.length).toBe(1);
    });


});