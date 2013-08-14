var HolePresenter = (function () {
    function HolePresenter(player, result) {
        this.player = player;
        this.result = result;
        this.score = result.score;
    }
    HolePresenter.prototype.increaseScore = function () {
        this.score++;
    };

    HolePresenter.prototype.descreaseScore = function () {
        if (this.score > 1) {
            this.score--;
        }
    };
    return HolePresenter;
})();

var HoleResult = (function () {
    function HoleResult(par) {
        this.par = par;
        this.score = par;
    }
    return HoleResult;
})();

var PlayerResult = (function () {
    function PlayerResult(player, holes) {
        this.player = player;
        this.result = new Array();
        for (var i = 0; i < holes.length; i++) {
            this.result.push(new HoleResult(holes[i].par));
        }
    }
    return PlayerResult;
})();

var RoundResultSaveObject = (function () {
    function RoundResultSaveObject(key, course, players) {
        this.key = key;
        this.course = course;
        this.results = new Array();
        for (var i = 0; i < players.length; i++) {
            this.results.push(new PlayerResult(players[i], course.holes));
        }
    }
    return RoundResultSaveObject;
})();

var RoundFactory = (function () {
    function RoundFactory() {
    }
    RoundFactory.prototype.InitilizeNewRound = function (course) {
        this.clearRound();
        this.course = course;
        this.key = AuId.generateKey();
        this.players = new Array();
    };

    RoundFactory.prototype.addPlayer = function (player) {
        this.players.push(player);
    };

    RoundFactory.prototype.clearPlayers = function () {
        this.players = new Array();
    };

    RoundFactory.prototype.startRound = function () {
        this.result = new RoundResultSaveObject(this.key, this.course, this.players);
    };

    RoundFactory.prototype.getHole = function (holeIndex) {
        var retval = new Array();

        for (var playerIndex = 0; playerIndex < this.result.results.length; playerIndex++) {
            retval.push(new HolePresenter(this.result.results[playerIndex].player, this.result.results[playerIndex].result[holeIndex]));
        }
        return retval;
    };

    RoundFactory.prototype.clearRound = function () {
        this.key = null;
        this.course = null;
        this.players = null;
    };
    return RoundFactory;
})();
