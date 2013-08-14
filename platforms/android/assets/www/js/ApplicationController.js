var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DbHandler = (function () {
    function DbHandler(name) {
        this.name = name;
    }
    DbHandler.prototype.getAll = function (callback) {
        Lawnchair({ name: this.name, adaptor: 'webkit' }, function (db) {
            db.all(function (courses) {
                callback(courses);
            });
        });
    };

    DbHandler.prototype.save = function (obj, callback) {
        Lawnchair({ name: this.name, adaptor: 'webkit' }, function (db) {
            db.save(obj, function () {
                callback();
            });
        });
    };

    DbHandler.prototype.remove = function (key, callback) {
        Lawnchair({ name: this.name, adaptor: 'webkit' }, function (db) {
            db.remove(key, function () {
                callback();
            });
        });
    };
    return DbHandler;
})();

var CourseDbHandler = (function (_super) {
    __extends(CourseDbHandler, _super);
    function CourseDbHandler() {
        _super.call(this, "CourseTable");
    }
    return CourseDbHandler;
})(DbHandler);

var ApplicationController = (function () {
    function ApplicationController($scope) {
        var _this = this;
        this.$scope = $scope;
        $scope.courses = new Array();
        this.db = new CourseDbHandler();
        this.db.getAll(function (courses) {
            _this.$scope.courses = courses;
        });

        $scope.activeCourse = CourseModel.Empty();

        $scope.editCourse = function (course) {
            return _this.editCourse(course);
        };

        $scope.deleteCourse = function (course) {
            return _this.deleteCourse(course);
        };
        $scope.addCourse = function () {
            return _this.addCourse();
        };
        $scope.saveCourse = function (course) {
            return _this.saveCourse(course);
        };
        $scope.cancelCourseEdit = function () {
            return _this.cancelCourseEdit();
        };
    }
    ApplicationController.prototype.editCourse = function (course) {
        this.$scope.activeCourse = angular.copy(course);
        $.mobile.changePage("#EditCourse");
    };

    ApplicationController.prototype.addCourse = function () {
        this.$scope.activeCourse = new CourseModel("", 18, true);
        $.mobile.changePage("#EditCourse");
    };

    ApplicationController.prototype.deleteCourse = function (course) {
        var _this = this;
        this.db.remove(course.key, function () {
            _this.endCourseEdit();
        });
    };

    ApplicationController.prototype.saveCourse = function (course) {
        var _this = this;
        this.db.save(course, function () {
            _this.endCourseEdit();
        });
    };

    ApplicationController.prototype.cancelCourseEdit = function () {
        this.endCourseEdit();
    };

    ApplicationController.prototype.endCourseEdit = function () {
        var _this = this;
        this.$scope.activeCourse = CourseModel.Empty();
        this.db.getAll(function (courses) {
            _this.$scope.courses = courses;
            $.mobile.changePage("#Courses");
        });
    };
    return ApplicationController;
})();
//@ sourceMappingURL=ApplicationController.js.map
