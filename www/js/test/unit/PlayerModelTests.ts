/// <reference path='../../Controllers/PlayerListController.ts' />
/// <reference path='../../Models/PlayerModel.ts' />

/// <reference path='../../Factories/StorageFactories.ts' />
/// <reference path='_all_unittests.d.ts' />



describe('PlayerModelTests', () => {
    
    it("A new PlayerModel should be properly initilized", () => {
        var player = new PlayerModel("KEY", "NAME");
        expect(player.key).toBe("KEY");
        expect(player.name).toBe("NAME");

    });

    it('Should be properly initialized when loaded stored player', () => {
        var dbPlayer = new PlayerSaveObject("KEY","NAME");
        var player = PlayerModel.createFromSavedPlayer(dbPlayer);
        expect(player.key).toBe(dbPlayer.key);
        expect(player.name).toBe(dbPlayer.name);

    });

    it('Should create a proper saveObject', () => {
        var player = new PlayerModel("KEY", "NAME");
        var objToSave = player.toSaveObject();
        expect(objToSave.key).toBe(player.key);
        expect(objToSave.name).toBe(player.name);
    });

    it('Should create a new player properly', () => {
        var player = PlayerModel.createNewPlayer();
        expect(player.key.length).toBeGreaterThan(10);
        expect(player.name).toBe("");
    });

    it('Should generate keys with the length 36', () => {
        var player1 = PlayerModel.createNewPlayer();
       expect(player1.key.length).toBe(36);
    });

    it('Should generate unique keys', () => {
        var player1 = PlayerModel.createNewPlayer();
        var player2 = PlayerModel.createNewPlayer();
        expect(player1.key).not.toBe(player2.key);
    });



});