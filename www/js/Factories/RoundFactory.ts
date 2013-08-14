/// <reference path='..\Models\CourseModel.ts' />
/// <reference path='..\Models\PlayerModel.ts' />
/// <reference path='..\_all.d.ts' />

class HolePresenter {
    public score: number;

    constructor(private player: PlayerSaveObject, private result: HoleResult) {
        this.score = result.score;
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


class HoleResult {
    public score: number;

    constructor(private par: number) {
        this.score = par;
    }

}

class PlayerResult {
    public result: Array<HoleResult>;
    constructor(public player: PlayerSaveObject, holes: Array<HoleSaveObject>) {
        this.result = new Array<HoleResult>();
        for (var i = 0; i < holes.length; i++) {
            this.result.push(new HoleResult(holes[i].par));
        }
    }    
}


class RoundResultSaveObject {
    public results: Array<PlayerResult>;
    
    constructor(private key: string, private course: CourseSaveObject, players: Array<PlayerSaveObject>) {
        this.results = new Array<PlayerResult>();
        for (var i = 0; i < players.length; i++) {
            this.results.push(new PlayerResult(players[i], course.holes));
        }
    }
}



class RoundFactory {
    public result: RoundResultSaveObject;
    public key: string;
    public course: CourseSaveObject;
    public players: Array<PlayerSaveObject>;
    
    public InitilizeNewRound(course: CourseSaveObject): void {
        this.clearRound();
        this.course = course;
        this.key = AuId.generateKey();
        this.players = new Array<PlayerSaveObject>();
    
    }

    public addPlayer(player: PlayerSaveObject): void {
        this.players.push(player);
    }

    public clearPlayers(): void {
        this.players = new Array<PlayerSaveObject>();
    }

    public startRound() {
        this.result = new RoundResultSaveObject(this.key, this.course, this.players);
    }

    public getHole(holeIndex: number): Array<HolePresenter> {
        var retval = new Array<HolePresenter>();
        
        for (var playerIndex = 0; playerIndex < this.result.results.length; playerIndex++) {
            retval.push(new HolePresenter(this.result.results[playerIndex].player, this.result.results[playerIndex].result[holeIndex]));
        }
        return retval;
    }

    private clearRound() {
        this.key = null;
        this.course = null;
        this.players = null;
    }
}
