/// <reference path='..\..\lib\lawnchair\lawnchair.d.ts' />
/// <reference path='..\_all.d.ts' />
class PlayerSaveObject implements ISaveObject {
    constructor(public key: string, public name: string) {
    }
}



class PlayerModel {
    constructor(public key: string, public name: string) {

    }
    
    public static createNewPlayer(): PlayerModel {
        return new PlayerModel(AuId.generateKey(), "");
    }

    public static createFromSavedPlayer(savedPlayer: PlayerSaveObject): PlayerModel {
        return new PlayerModel(savedPlayer.key, savedPlayer.name);
    }

    public toSaveObject(): PlayerSaveObject {
        return new PlayerSaveObject(this.key, this.name);
    }

   
    

}