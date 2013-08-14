var RoundCourseController = (function () {
    function RoundCourseController($scope, courseFactory, roundFactory) {
        var _this = this;
        this.$scope = $scope;
        this.courseFactory = courseFactory;
        this.roundFactory = roundFactory;
        this.$scope.courses = new Array();
        this.$scope.onCancel = function () {
            return _this.cancel();
        };
        this.$scope.onNext = function (course) {
            return _this.courseSelected(course);
        };

        this.courseFactory.getAll(function (courses) {
            _this.$scope.courses = courses;
        });
    }
    RoundCourseController.prototype.cancel = function () {
        this.$scope.changePage('/');
    };

    RoundCourseController.prototype.courseSelected = function (course) {
        this.roundFactory.InitilizeNewRound(course);
        this.$scope.changePage('/round/players');
    };
    return RoundCourseController;
})();

var SelectPlayer = (function () {
    function SelectPlayer(player) {
        this.player = player;
        this.selected = false;
    }
    return SelectPlayer;
})();

var RoundPlayersController = (function () {
    function RoundPlayersController($scope, playerFactory, roundFactory) {
        var _this = this;
        this.$scope = $scope;
        this.playerFactory = playerFactory;
        this.roundFactory = roundFactory;
        this.$scope.players = new Array();
        this.$scope.onBack = function () {
            return _this.back();
        };
        this.$scope.onNext = function () {
            return _this.playersSelected();
        };

        this.playerFactory.getAll(function (players) {
            _this.loadPlayers(players);
        });
    }
    RoundPlayersController.prototype.loadPlayers = function (players) {
        for (var i = 0; i < players.length; i++) {
            this.$scope.players.push(new SelectPlayer(players[i]));
        }
    };

    RoundPlayersController.prototype.back = function () {
        this.$scope.changePage('/round/course');
    };

    RoundPlayersController.prototype.playersSelected = function () {
        this.roundFactory.clearPlayers();
        for (var i = 0; i < this.$scope.players.length; i++) {
            if (this.$scope.players[i].selected) {
                this.roundFactory.addPlayer(this.$scope.players[i].player);
            }
        }
        this.roundFactory.startRound();
        this.$scope.changePage('/round/play/0');
    };
    return RoundPlayersController;
})();

var HoleResultHelper = (function () {
    function HoleResultHelper(player, hole) {
        this.player = player;
        this.hole = hole;
        this.score = hole.par;
    }
    HoleResultHelper.prototype.increaseScore = function () {
        this.score++;
    };

    HoleResultHelper.prototype.descreaseScore = function () {
        if (this.score > 1) {
            this.score--;
        }
    };
    return HoleResultHelper;
})();

var RoundPlayHoleController = (function () {
    function RoundPlayHoleController($scope, $routeParams, roundFactory) {
        var _this = this;
        this.$scope = $scope;
        this.roundFactory = roundFactory;
        this.$scope.onBack = function () {
            return _this.back();
        };
        this.$scope.onNext = function () {
            return _this.next();
        };
        this.$scope.onDecreaseScore = function (result) {
            return _this.decreaseScore(result);
        };
        this.$scope.onIncreaseScore = function (result) {
            return _this.increaseScore(result);
        };
        if ($routeParams !== undefined && $routeParams.holeIndex !== undefined) {
            this.holeIndex = parseInt($routeParams.holeIndex, 10);
        }
        this.$scope.holeResults = roundFactory.getHole(this.holeIndex);
    }
    RoundPlayHoleController.prototype.back = function () {
        if (this.holeIndex == 0) {
            this.$scope.changePage('/round/players');
        } else {
            this.$scope.changePage('/round/play/' + this.holeIndex--);
        }
    };

    RoundPlayHoleController.prototype.next = function () {
        var newHole = this.holeIndex + 1;
        this.$scope.changePage('/round/play/' + newHole.toString());
    };

    RoundPlayHoleController.prototype.decreaseScore = function (result) {
        result.descreaseScore();
    };

    RoundPlayHoleController.prototype.increaseScore = function (result) {
        result.increaseScore();
    };
    return RoundPlayHoleController;
})();
