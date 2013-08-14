var stadiscisc;
(function (stadiscisc) {
    var stadiscics = angular.module('stadiscics', ['ajoslin.mobile-navigate']).controller('BaseController', BaseController).controller('CourselistController', CourselistController).controller('CourseController', CourseController).controller('PlayerlistController', PlayerlistController).controller('PlayerController', PlayerController).factory('pageNavFactory', function ($navigate) {
        return new PageNavFactory($navigate);
    }).factory('courseFactory', function () {
        return new DbHandler("CourseTable");
    }).factory('playerFactory', function () {
        return new DbHandler("PlayerTable");
    }).factory('roundFactory', function () {
        return new RoundFactory();
    }).config(function ($routeProvider) {
        $routeProvider.when('/', {
            title: 'Stadiscisc',
            templateUrl: 'partials/home.html',
            controller: 'BaseController'
        }).when('/about', {
            title: 'About',
            templateUrl: 'partials/about.html'
        }).when('/courselist', {
            title: 'Courses',
            templateUrl: 'partials/courselist.html',
            controller: 'CourselistController'
        }).when('/course/:courseId', {
            title: 'Edit course',
            templateUrl: 'partials/course.html',
            controller: 'CourseController'
        }).when('/addCourse', {
            title: 'Add course',
            templateUrl: 'partials/course.html',
            controller: 'CourseController'
        }).when('/playerlist', {
            title: 'Players',
            templateUrl: 'partials/playerlist.html',
            controller: 'PlayerlistController'
        }).when('/addPlayer', {
            title: 'Add player',
            templateUrl: 'partials/player.html',
            controller: 'PlayerController'
        }).when('/player/:playerId', {
            title: 'Edit player',
            templateUrl: 'partials/player.html',
            controller: 'PlayerController'
        }).when('/round/course', {
            title: 'Select course',
            templateUrl: 'partials/Round/selectCourse.html',
            controller: 'RoundCourseController'
        }).when('/round/players', {
            title: 'Select players',
            templateUrl: 'partials/Round/selectPlayers.html',
            controller: 'RoundPlayersController'
        }).when('/round/play/:holeIndex', {
            title: 'Play hole: {$hole$}',
            templateUrl: 'partials/Round/playhole.html',
            controller: 'RoundPlayHoleController'
        }).otherwise({ redirectTo: '/' });
    });
})(stadiscisc || (stadiscisc = {}));
