/// <reference path='_all_unittests.d.ts' />
/// <reference path='PlayerListControllerTests.ts' />
/// <reference path='../../Controllers/PlayerController.ts' />


describe('PlayerControllerTests - New Player', () => {
    var scope: IPlayerScope;
    var players: IDbHandler<PlayerSaveObject>;
    var routeParams: IPlayerParams;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(($rootScope, $controller, $routeParams, playerFactory) => {
        scope = $rootScope.$new();
        //Setup base contoller
        $rootScope.changePage = (page: string) => { };
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

    
    it("New player should be initilized", () => {
        expect(PlayerModel.createNewPlayer).toHaveBeenCalled();
    });
    
    it("Should be marked as a new player", () => {
        expect(scope.newPlayer).toBe(true);
    });
    
    it("Should return to playerList when cancel", () => {
        scope.onCancel();
        expect(scope.changePage).toHaveBeenCalledWith("/playerlist");
    });

    it("Should call save on dbFactory and after that load playerList onSave", () => {
        scope.onSave();
        expect(players.save).toHaveBeenCalled();
        expect(scope.changePage).toHaveBeenCalledWith("/playerlist");
    });

    it("Should call remove on dbFactory and after that load courseList onDelete", () => {
        scope.onDelete();
        expect(players.remove).toHaveBeenCalled();
        expect(scope.changePage).toHaveBeenCalledWith("/playerlist");
    });
});


describe('PlayerControllerTests - Edit Player', () => {
    var scope: IPlayerScope;
    var players: IDbHandler<PlayerSaveObject>;
    var routeParams: IPlayerParams;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(($rootScope, $controller, $routeParams, playerFactory) => {
        scope = $rootScope.$new();
        //Setup base contoller
        $rootScope.changePage = (page: string) => { };
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

    it("PLayer should be fetched from db factory", () => {
        expect(players.get).toHaveBeenCalled();
    });

    it("Should be marked as a edit player", () => {
        expect(scope.newPlayer).toBe(false);
    });

    it("Player should be fecthed from db", () => {
        expect(PlayerModel.createFromSavedPlayer).toHaveBeenCalled();
    
    });

   

});

