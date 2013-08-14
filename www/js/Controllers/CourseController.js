var CourseController = (function () {
    function CourseController($scope, $routeParams, courseFactory) {
        var _this = this;
        this.$scope = $scope;
        this.courseFactory = courseFactory;
        $scope.newCourse = true;
        $scope.course = CourseModel.NewCourse();

        $scope.onSave = function () {
            return _this.saveCourse();
        };
        $scope.onDelete = function () {
            return _this.deleteCourse();
        };
        $scope.onCancel = function () {
            return _this.cancel();
        };
        $scope.onAddHole = function () {
            return _this.addHole();
        };
        $scope.onRemoveHole = function () {
            return _this.removeHole();
        };
        $scope.onParDecrease = function (hole) {
            return _this.parDecrease(hole);
        };
        $scope.onParIncrease = function (hole) {
            return _this.parIncrease(hole);
        };
        $scope.onAfterEdit = function () {
            return _this.afterEdit();
        };

        var courseKey = $routeParams.courseId;
        if (courseKey !== undefined) {
            $scope.newCourse = false;
            this.courseFactory.get(courseKey, function (course) {
                _this.setCourse(course);
            });
        }
    }
    CourseController.prototype.setCourse = function (course) {
        this.$scope.course = CourseModel.FromSavedCourse(course);
    };

    CourseController.prototype.addHole = function () {
        this.$scope.course.holeCount++;
        this.$scope.course.holeCountChange();
    };

    CourseController.prototype.removeHole = function () {
        if (this.$scope.course.holeCount > 1) {
            this.$scope.course.holeCount--;
            this.$scope.course.holeCountChange();
        }
    };

    CourseController.prototype.saveCourse = function () {
        this.courseFactory.save(this.$scope.course.toSaveObject(), this.$scope.onAfterEdit);
    };

    CourseController.prototype.deleteCourse = function () {
        this.courseFactory.remove(this.$scope.course.key, this.$scope.onAfterEdit);
    };

    CourseController.prototype.cancel = function () {
        this.afterEdit();
    };

    CourseController.prototype.parDecrease = function (hole) {
        hole.parDecrease();
    };

    CourseController.prototype.parIncrease = function (hole) {
        hole.parIncrease();
    };

    CourseController.prototype.afterEdit = function () {
        this.$scope.changePage("/courselist");
    };
    return CourseController;
})();
