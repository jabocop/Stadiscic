/// <reference path='..\_all.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='..\Factories\StorageFactories.ts' />
/// <reference path='..\Factories\RoundFactory.ts' />
/// <reference path='..\Models\CourseModel.ts' />
/// <reference path='..\Models\PlayerModel.ts' />

interface RoundCourseScope extends BaseScope {
    courses: Array<CourseSaveObject>
    onCancel: () => void;
    onNext: (course : CourseSaveObject) => void;
}

class RoundCourseController {

    constructor(private $scope: RoundCourseScope, private courseFactory: DbHandler<CourseSaveObject>,private roundFactory : RoundFactory) {
        this.$scope.courses = new Array<CourseSaveObject>();
        this.$scope.onCancel = () => this.cancel();
        this.$scope.onNext = (course: CourseSaveObject) => this.courseSelected(course);

        this.courseFactory.getAll((courses) => { this.$scope.courses = courses; });
    }

    public cancel(): void {
        this.$scope.changePage('/');
    }

    public courseSelected(course: CourseSaveObject) {
        this.roundFactory.InitilizeNewRound(course);
        this.$scope.changePage('/round/players');
    }

}

class SelectPlayer {
    public selected: boolean;
    constructor(public player: PlayerSaveObject) {
        this.selected = false;
    }
}



interface RoundPlayersScope extends BaseScope {
    players: Array<SelectPlayer>
    onBack: () => void;
    onNext: () => void;
}



class RoundPlayersController {

    constructor(private $scope: RoundPlayersScope, private playerFactory: DbHandler<PlayerSaveObject>, private roundFactory: RoundFactory) {
        this.$scope.players = new Array<SelectPlayer>();
        this.$scope.onBack = () => this.back();
        this.$scope.onNext = () => this.playersSelected();

        this.playerFactory.getAll((players) => { this.loadPlayers(players); });
    }

    private loadPlayers(players: Array<PlayerSaveObject>) {
        for (var i = 0; i < players.length; i++) {
            this.$scope.players.push(new SelectPlayer(players[i]));    
        }
    }

    public back(): void {
        this.$scope.changePage('/round/course');
    }
    
    
    public playersSelected() {
        this.roundFactory.clearPlayers();
        for (var i = 0; i < this.$scope.players.length; i++) {
            if (this.$scope.players[i].selected) {
                this.roundFactory.addPlayer(this.$scope.players[i].player);
            }
        }
        this.roundFactory.startRound();
        this.$scope.changePage('/round/play/0');
        
    }

}

class HoleResultHelper {
    public score: number;
    
    constructor(public player: PlayerSaveObject, public hole: HoleSaveObject) {
        this.score = hole.par;
    }

    public increaseScore(): void {
        this.score++;
    }

    public descreaseScore(): void {
        if (this.score > 1) {
            this.score--;
        }
    }

}

interface RoundPlayHoleScope extends BaseScope {
    activeHole: HoleSaveObject;
    holeResults: Array<HolePresenter>;
    onDecreaseScore: (result: HolePresenter) => void;
    onIncreaseScore: (result: HolePresenter) => void;
    onBack: () => void;
    onNext: () => void;
}

interface IPlayHoleParams {
    holeIndex: string;
}
class RoundPlayHoleController {
    private holeIndex : number
    constructor(private $scope: RoundPlayHoleScope, $routeParams: IPlayHoleParams , private roundFactory: RoundFactory) {
        this.$scope.onBack = () => this.back();
        this.$scope.onNext = () => this.next();
        this.$scope.onDecreaseScore = (result: HolePresenter) => this.decreaseScore(result);
        this.$scope.onIncreaseScore = (result: HolePresenter) => this.increaseScore(result);
        if ($routeParams !== undefined && $routeParams.holeIndex !== undefined) {
            this.holeIndex = parseInt($routeParams.holeIndex, 10);
        }
        this.$scope.holeResults = roundFactory.getHole(this.holeIndex);

    }

    public back(): void {
        if (this.holeIndex == 0) {
            this.$scope.changePage('/round/players');
        } else {
            this.$scope.changePage('/round/play/' + this.holeIndex--);
        }
    }

    public next() : void {
        var newHole :number = this.holeIndex+1;
        this.$scope.changePage('/round/play/' + newHole.toString());
    }

    public decreaseScore(result: HolePresenter): void {
        result.descreaseScore();
    }

    public increaseScore(result: HolePresenter): void {
        result.increaseScore();
    }
    

}

