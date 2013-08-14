var PlayerlistController = (function () {
    function PlayerlistController($scope, playerFactory) {
        var _this = this;
        this.$scope = $scope;
        this.playerFactory = playerFactory;
        $scope.onEditPlayer = function (player) {
            return _this.editPlayer(player);
        };

        $scope.onAddPlayer = function () {
            return _this.addPlayer();
        };

        this.$scope.players = new Array();

        this.playerFactory.getAll(function (players) {
            _this.$scope.players = players;
        });
    }
    PlayerlistController.prototype.addPlayer = function () {
        this.$scope.changePage('/addPlayer');
    };

    PlayerlistController.prototype.editPlayer = function (player) {
        this.$scope.changePage('/player/' + player.key);
    };
    return PlayerlistController;
})();
