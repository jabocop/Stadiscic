describe('RoundControllerTests - Select course', function () {
    var scope;
    var courses;
    var roundFac;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller, courseFactory, roundFactory) {
        scope = $rootScope.$new();

        $rootScope.changePage = function (page) {
        };
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

    it("Courses should be listed", function () {
        expect(courses.getAll).toHaveBeenCalled();
        expect(scope.courses.length).toBe(2);
    });

    it("Should return to main menu when cancel", function () {
        scope.onCancel();
        expect(scope.changePage).toHaveBeenCalledWith("/");
    });

    it("Should initlize a new round and move to next page when course selected", function () {
        scope.onNext(scope.courses[0]);
        expect(roundFac.InitilizeNewRound).toHaveBeenCalledWith(scope.courses[0]);
        expect(scope.changePage).toHaveBeenCalledWith("/round/players");
    });
});

describe('RoundControllerTests - Select players', function () {
    var scope;
    var players;
    var roundFac;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller, playerFactory, roundFactory) {
        scope = $rootScope.$new();

        $rootScope.changePage = function (page) {
        };
        spyOn(scope, 'changePage');

        players = new dummyPlayerFactory();
        spyOn(players, 'getAll').andCallThrough();

        roundFac = roundFactory;
        var holes = new Array();
        holes.push(new HoleSaveObject(1, 3));
        roundFac.InitilizeNewRound(new CourseSaveObject("TEST", "TEST", holes));

        $controller('RoundPlayersController', {
            $scope: scope,
            playerFactory: players,
            roundFactory: roundFactory
        });
    }));

    it("Players should be listed", function () {
        expect(players.getAll).toHaveBeenCalled();
        expect(scope.players.length).toBe(3);
    });

    it("Should return to select course, on back", function () {
        scope.onBack();
        expect(scope.changePage).toHaveBeenCalledWith("/round/course");
    });

    it("Should add all selected players to roundFactory and move to next page on next", function () {
        scope.players[0].selected = true;
        scope.players[2].selected = true;

        scope.onNext();
        expect(roundFac.players.length).toBe(2);
        expect(roundFac.players[0].key).toBe('123');
        expect(roundFac.players[1].key).toBe('789');

        expect(scope.changePage).toHaveBeenCalledWith("/round/play/0");
    });
});
