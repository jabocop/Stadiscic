var dummyCourseFactory = (function () {
    function dummyCourseFactory() {
    }
    dummyCourseFactory.prototype.get = function (key, callback) {
        var holes = new Array();
        holes.push(new HoleSaveObject(1, 3));
        holes.push(new HoleSaveObject(2, 4));

        callback(new CourseSaveObject('123', '123_NAME', holes));
    };

    dummyCourseFactory.prototype.getAll = function (callback) {
        var courses = new Array();
        courses.push(new CourseSaveObject('123', '123', null));
        courses.push(new CourseSaveObject('456', '456', null));
        callback(courses);
    };

    dummyCourseFactory.prototype.save = function (obj, callback) {
        callback();
    };

    dummyCourseFactory.prototype.remove = function (key, callback) {
        callback();
    };
    return dummyCourseFactory;
})();

describe('CourseListControllerTests', function () {
    var scope;
    var courses;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller, courseFactory) {
        scope = $rootScope.$new();
        $rootScope.changePage = function (page) {
        };
        spyOn(scope, 'changePage');
        courses = new dummyCourseFactory();

        $controller('CourselistController', {
            $scope: scope,
            courseFactory: courses
        });
    }));

    it("CourselistController should been properly initlized", function () {
        expect(scope.courses.length).toBe(2);
    });

    it("Should open Course page when edit button is hit", function () {
        var course = new CourseSaveObject("MY_KEY", "TEST", null);
        scope.editCourse(course);
        expect(scope.changePage).toHaveBeenCalledWith('/course/' + course.key);
    });

    it("Should open Course page without key when add button is hit", function () {
        scope.addCourse();
        expect(scope.changePage).toHaveBeenCalledWith('/addCourse');
    });
});
