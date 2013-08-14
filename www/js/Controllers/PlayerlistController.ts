/// <reference path='..\_all.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='..\Factories\StorageFactories.ts' />
/// <reference path='..\Models\PlayerModel.ts' />

interface PlayerlistScope extends BaseScope {
    players: Array<PlayerSaveObject>
    onAddPlayer: () => void;
    onEditPlayer: (player : PlayerSaveObject) => void;
}

class PlayerlistController {
    
    constructor(private $scope: PlayerlistScope , private playerFactory: DbHandler<PlayerSaveObject>) {
        
        $scope.onEditPlayer = (player:PlayerSaveObject) => this.editPlayer(player);
        
        $scope.onAddPlayer = () => this.addPlayer();

        this.$scope.players = new Array<PlayerSaveObject>();
        
        this.playerFactory.getAll((players) => { this.$scope.players = players; });
    }

    public addPlayer() {
        this.$scope.changePage('/addPlayer');
    }

    public editPlayer(player : PlayerSaveObject) {
        this.$scope.changePage('/player/'+player.key);
    }
}
