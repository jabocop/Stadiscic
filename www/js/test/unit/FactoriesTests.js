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

describe("RoundFactory tests", function () {
    var course;
    var factory;
    beforeEach(function () {
        course = new CourseSaveObject("KEY", "NAME", null);
        factory = new RoundFactory();
        spyOn(AuId, 'generateKey').andCallThrough();
        factory.InitilizeNewRound(course);
    });
    it("New round should be properly initlized", function () {
        expect(AuId.generateKey).toHaveBeenCalled();
        expect(factory.course).toBe(course);
        expect(factory.players.length).toBe(0);
    });

    it("Should add a new player", function () {
        factory.addPlayer(new PlayerSaveObject("PLAYER_KEY", "PLAYER"));
        expect(factory.players.length).toBe(1);
    });
});
