var PlayerSaveObject = (function () {
    function PlayerSaveObject(key, name) {
        this.key = key;
        this.name = name;
    }
    return PlayerSaveObject;
})();

var PlayerModel = (function () {
    function PlayerModel(key, name) {
        this.key = key;
        this.name = name;
    }
    PlayerModel.createNewPlayer = function () {
        return new PlayerModel(AuId.generateKey(), "");
    };

    PlayerModel.createFromSavedPlayer = function (savedPlayer) {
        return new PlayerModel(savedPlayer.key, savedPlayer.name);
    };

    PlayerModel.prototype.toSaveObject = function () {
        return new PlayerSaveObject(this.key, this.name);
    };
    return PlayerModel;
})();
