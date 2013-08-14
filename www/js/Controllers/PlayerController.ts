/// <reference path='..\_all.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='..\Models\CourseModel.ts' />
/// <reference path='..\Factories\StorageFactories.ts' />

interface IPlayerScope extends BaseScope {
    player: PlayerModel;
    newPlayer: boolean;
    onCancel: () => void;
    onDelete: () => void;
    onSave: () => void;
    onAfterEdit: () => void;
}

interface IPlayerParams {
    playerId: string


}

class PlayerController {
    
    constructor(private $scope: IPlayerScope, $routeParams: IPlayerParams, private playerFactory: DbHandler<PlayerSaveObject>) {

        $scope.newPlayer = true;
        $scope.player = PlayerModel.createNewPlayer();

        $scope.onSave = () => this.savePlayer();
        $scope.onDelete = () => this.deletePlayer();
        $scope.onCancel = () => this.cancel();
        $scope.onAfterEdit = () => this.afterEdit();


        var playerKey = $routeParams.playerId;
        if (playerKey !== undefined) {
            
            $scope.newPlayer = false;
            this.playerFactory.get(playerKey, (player) => { this.setPlayer(player); });
        }
    
    }

    public setPlayer(player: PlayerSaveObject) {
        this.$scope.player = PlayerModel.createFromSavedPlayer(player);

    }

   
    public savePlayer(): void {
        this.playerFactory.save(this.$scope.player.toSaveObject(), this.$scope.onAfterEdit);
    }

    public deletePlayer(): void {
        this.playerFactory.remove(this.$scope.player.key, this.$scope.onAfterEdit);
    }

    public cancel(): void {
        this.afterEdit();
    }

    
    public afterEdit(): void {
        this.$scope.changePage("/playerlist");
    
    
    }
}