/// <reference path='../../Factories/StorageFactories.ts' />
/// <reference path='_all_unittests.d.ts' />
/// <reference path='../../Controllers/PlayerlistController.ts' />

// Mock implementation of the DbHandler.
class dummyPlayerFactory implements IDbHandler<PlayerSaveObject> {
    public get(key: string, callback: (obj: PlayerSaveObject) => void ) {
        callback(new PlayerSaveObject('KEY', 'NAME'));
    }

    public getAll(callback: (obj: Array<PlayerSaveObject>) => void ) {
        var players = new Array<PlayerSaveObject>();
        players.push(new PlayerSaveObject('123', '123_NAME'));
        players.push(new PlayerSaveObject('456', '456_NAME'));
        players.push(new PlayerSaveObject('789', '789_NAME'));
        callback(players);
    }

    public save(obj: PlayerSaveObject, callback: () => void ) {
        callback();
    }

    public remove(key: string, callback: () => void ) {
        callback();
    }
}

describe('PlayerListControllerTests', () => {
    var scope: PlayerlistScope;
    var playersFactory: IDbHandler<PlayerSaveObject>;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(($rootScope, $controller, playerFactory) => {
        scope = $rootScope.$new();
        $rootScope.changePage = (page: string) => { };
        spyOn(scope, 'changePage');
        playersFactory = new dummyPlayerFactory();

        $controller('PlayerlistController', {
            $scope: scope,
            playerFactory: playersFactory
        });

    }));

    it("PlayerlistController should contain all players from factory", () => {
        expect(scope.players.length).toBe(3);
    });

    it("Should open add player dialog on add player button", () => {
        scope.onAddPlayer();

        expect(scope.changePage).toHaveBeenCalledWith('/addPlayer');
    });

    it("Should open edit player dialog on edit player button", () => {
        var player = new PlayerSaveObject("KEY", "NAME");
        scope.onEditPlayer(player);

        expect(scope.changePage).toHaveBeenCalledWith('/player/'+player.key);
    });
});