var CourselistController = (function () {
    function CourselistController($scope, courseFactory) {
        var _this = this;
        this.$scope = $scope;
        this.courseFactory = courseFactory;
        $scope.editCourse = function (course) {
            return _this.editCourse(course);
        };

        $scope.addCourse = function () {
            return _this.addCourse();
        };

        this.$scope.courses = new Array();

        this.courseFactory.getAll(function (courses) {
            _this.$scope.courses = courses;
        });
    }
    CourselistController.prototype.editCourse = function (course) {
        this.$scope.changePage('/course/' + course.key);
    };

    CourselistController.prototype.addCourse = function () {
        this.$scope.changePage('/addCourse');
    };
    return CourselistController;
})();
