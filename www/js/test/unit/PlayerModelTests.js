describe('PlayerModelTests', function () {
    it("A new PlayerModel should be properly initilized", function () {
        var player = new PlayerModel("KEY", "NAME");
        expect(player.key).toBe("KEY");
        expect(player.name).toBe("NAME");
    });

    it('Should be properly initialized when loaded stored player', function () {
        var dbPlayer = new PlayerSaveObject("KEY", "NAME");
        var player = PlayerModel.createFromSavedPlayer(dbPlayer);
        expect(player.key).toBe(dbPlayer.key);
        expect(player.name).toBe(dbPlayer.name);
    });

    it('Should create a proper saveObject', function () {
        var player = new PlayerModel("KEY", "NAME");
        var objToSave = player.toSaveObject();
        expect(objToSave.key).toBe(player.key);
        expect(objToSave.name).toBe(player.name);
    });

    it('Should create a new player properly', function () {
        var player = PlayerModel.createNewPlayer();
        expect(player.key.length).toBeGreaterThan(10);
        expect(player.name).toBe("");
    });

    it('Should generate keys with the length 36', function () {
        var player1 = PlayerModel.createNewPlayer();
        expect(player1.key.length).toBe(36);
    });

    it('Should generate unique keys', function () {
        var player1 = PlayerModel.createNewPlayer();
        var player2 = PlayerModel.createNewPlayer();
        expect(player1.key).not.toBe(player2.key);
    });
});
