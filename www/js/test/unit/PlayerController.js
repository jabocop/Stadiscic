describe('PlayerControllerTests - New Player', function () {
    var scope;
    var players;
    var routeParams;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller, $routeParams, playerFactory) {
        scope = $rootScope.$new();

        $rootScope.changePage = function (page) {
        };
        spyOn(scope, 'changePage');

        players = new dummyPlayerFactory();
        spyOn(players, 'save').andCallThrough();
        spyOn(players, 'remove').andCallThrough();
        spyOn(PlayerModel, 'createNewPlayer').andCallThrough();

        routeParams = $routeParams;
        routeParams.playerId = undefined;

        $controller('PlayerController', {
            $scope: scope,
            $routeParams: routeParams,
            playerFactory: players
        });
    }));

    it("New player should be initilized", function () {
        expect(PlayerModel.createNewPlayer).toHaveBeenCalled();
    });

    it("Should be marked as a new player", function () {
        expect(scope.newPlayer).toBe(true);
    });

    it("Should return to playerList when cancel", function () {
        scope.onCancel();
        expect(scope.changePage).toHaveBeenCalledWith("/playerlist");
    });

    it("Should call save on dbFactory and after that load playerList onSave", function () {
        scope.onSave();
        expect(players.save).toHaveBeenCalled();
        expect(scope.changePage).toHaveBeenCalledWith("/playerlist");
    });

    it("Should call remove on dbFactory and after that load courseList onDelete", function () {
        scope.onDelete();
        expect(players.remove).toHaveBeenCalled();
        expect(scope.changePage).toHaveBeenCalledWith("/playerlist");
    });
});

describe('PlayerControllerTests - Edit Player', function () {
    var scope;
    var players;
    var routeParams;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller, $routeParams, playerFactory) {
        scope = $rootScope.$new();

        $rootScope.changePage = function (page) {
        };
        spyOn(scope, 'changePage');
        spyOn(PlayerModel, 'createFromSavedPlayer').andCallThrough();

        players = new dummyPlayerFactory();
        spyOn(players, 'get').andCallThrough();
        routeParams = $routeParams;
        routeParams.playerId = "MY_KEY";

        $controller('PlayerController', {
            $scope: scope,
            $routeParams: routeParams,
            playerFactory: players
        });
    }));

    it("PLayer should be fetched from db factory", function () {
        expect(players.get).toHaveBeenCalled();
    });

    it("Should be marked as a edit player", function () {
        expect(scope.newPlayer).toBe(false);
    });

    it("Player should be fecthed from db", function () {
        expect(PlayerModel.createFromSavedPlayer).toHaveBeenCalled();
    });
});
