var PlayerController = (function () {
    function PlayerController($scope, $routeParams, playerFactory) {
        var _this = this;
        this.$scope = $scope;
        this.playerFactory = playerFactory;
        $scope.newPlayer = true;
        $scope.player = PlayerModel.createNewPlayer();

        $scope.onSave = function () {
            return _this.savePlayer();
        };
        $scope.onDelete = function () {
            return _this.deletePlayer();
        };
        $scope.onCancel = function () {
            return _this.cancel();
        };
        $scope.onAfterEdit = function () {
            return _this.afterEdit();
        };

        var playerKey = $routeParams.playerId;
        if (playerKey !== undefined) {
            $scope.newPlayer = false;
            this.playerFactory.get(playerKey, function (player) {
                _this.setPlayer(player);
            });
        }
    }
    PlayerController.prototype.setPlayer = function (player) {
        this.$scope.player = PlayerModel.createFromSavedPlayer(player);
    };

    PlayerController.prototype.savePlayer = function () {
        this.playerFactory.save(this.$scope.player.toSaveObject(), this.$scope.onAfterEdit);
    };

    PlayerController.prototype.deletePlayer = function () {
        this.playerFactory.remove(this.$scope.player.key, this.$scope.onAfterEdit);
    };

    PlayerController.prototype.cancel = function () {
        this.afterEdit();
    };

    PlayerController.prototype.afterEdit = function () {
        this.$scope.changePage("/playerlist");
    };
    return PlayerController;
})();
