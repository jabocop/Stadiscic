var dummyPlayerFactory = (function () {
    function dummyPlayerFactory() {
    }
    dummyPlayerFactory.prototype.get = function (key, callback) {
        callback(new PlayerSaveObject('KEY', 'NAME'));
    };

    dummyPlayerFactory.prototype.getAll = function (callback) {
        var players = new Array();
        players.push(new PlayerSaveObject('123', '123_NAME'));
        players.push(new PlayerSaveObject('456', '456_NAME'));
        players.push(new PlayerSaveObject('789', '789_NAME'));
        callback(players);
    };

    dummyPlayerFactory.prototype.save = function (obj, callback) {
        callback();
    };

    dummyPlayerFactory.prototype.remove = function (key, callback) {
        callback();
    };
    return dummyPlayerFactory;
})();

describe('PlayerListControllerTests', function () {
    var scope;
    var playersFactory;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller, playerFactory) {
        scope = $rootScope.$new();
        $rootScope.changePage = function (page) {
        };
        spyOn(scope, 'changePage');
        playersFactory = new dummyPlayerFactory();

        $controller('PlayerlistController', {
            $scope: scope,
            playerFactory: playersFactory
        });
    }));

    it("PlayerlistController should contain all players from factory", function () {
        expect(scope.players.length).toBe(3);
    });

    it("Should open add player dialog on add player button", function () {
        scope.onAddPlayer();

        expect(scope.changePage).toHaveBeenCalledWith('/addPlayer');
    });

    it("Should open edit player dialog on edit player button", function () {
        var player = new PlayerSaveObject("KEY", "NAME");
        scope.onEditPlayer(player);

        expect(scope.changePage).toHaveBeenCalledWith('/player/' + player.key);
    });
});
