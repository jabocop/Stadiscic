/// <reference path='_all_unittests.d.ts' />
/// <reference path='../../Controllers/RoundControllers.ts' />
/// <reference path='CourseListControllerTests.ts' />
/// <reference path='PlayerListControllerTests.ts' />

describe('RoundControllerTests - Select course', () => {
    var scope: RoundCourseScope;
    var courses: IDbHandler<CourseSaveObject>;
    var roundFac: RoundFactory;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(($rootScope, $controller, courseFactory, roundFactory) => {
        scope = $rootScope.$new();
        //Setup base contoller
        $rootScope.changePage = (page: string) => { };
        spyOn(scope, 'changePage');

        courses = new dummyCourseFactory();
        spyOn(courses, 'getAll').andCallThrough();

        roundFac = roundFactory;
        spyOn(roundFac, 'InitilizeNewRound').andCallThrough();
        
        $controller('RoundCourseController', {
            $scope: scope,
            courseFactory: courses,
            roundFactory: roundFactory
        });

    }));


    it("Courses should be listed", () => {
        expect(courses.getAll).toHaveBeenCalled();
        expect(scope.courses.length).toBe(2);
    });

    it("Should return to main menu when cancel", () => {
        scope.onCancel();
        expect(scope.changePage).toHaveBeenCalledWith("/");
    });

    it("Should initlize a new round and move to next page when course selected", () => {
        scope.onNext(scope.courses[0]);
        expect(roundFac.InitilizeNewRound).toHaveBeenCalledWith(scope.courses[0]);
        expect(scope.changePage).toHaveBeenCalledWith("/round/players");
    });


});


describe('RoundControllerTests - Select players', () => {
    var scope: RoundPlayersScope;
    var players: IDbHandler<PlayerSaveObject>;
    var roundFac: RoundFactory;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(($rootScope, $controller,  playerFactory, roundFactory) => {
        scope = $rootScope.$new();
        //Setup base contoller
        $rootScope.changePage = (page: string) => { };
        spyOn(scope, 'changePage');

        players = new dummyPlayerFactory();
        spyOn(players, 'getAll').andCallThrough();

        roundFac = roundFactory;
        var holes = new Array<HoleSaveObject>();
        holes.push(new HoleSaveObject(1, 3));
        roundFac.InitilizeNewRound(new CourseSaveObject("TEST", "TEST", holes));
        
        $controller('RoundPlayersController', {
            $scope: scope,
            playerFactory: players,
            roundFactory: roundFactory
        });

    }));


    it("Players should be listed", () => {
        expect(players.getAll).toHaveBeenCalled();
        expect(scope.players.length).toBe(3);
    });

    it("Should return to select course, on back", () => {
        scope.onBack();
        expect(scope.changePage).toHaveBeenCalledWith("/round/course");
    });

    it("Should add all selected players to roundFactory and move to next page on next", () => {
        //Prepare

        scope.players[0].selected = true;
        scope.players[2].selected = true;

        scope.onNext();
        expect(roundFac.players.length).toBe(2);
        expect(roundFac.players[0].key).toBe('123');
        expect(roundFac.players[1].key).toBe('789');

        expect(scope.changePage).toHaveBeenCalledWith("/round/play/0");
    });


});
