var CourseSaveObject = (function () {
    function CourseSaveObject(key, name, holes) {
        this.key = key;
        this.name = name;
        this.holes = holes;
    }
    return CourseSaveObject;
})();

var HoleSaveObject = (function () {
    function HoleSaveObject(holeNo, par) {
        this.holeNo = holeNo;
        this.par = par;
    }
    return HoleSaveObject;
})();

var HoleModel = (function () {
    function HoleModel(holeNo, par) {
        this.holeNo = holeNo;
        this.par = par;
    }
    HoleModel.prototype.parIncrease = function () {
        this.par++;
    };
    HoleModel.prototype.parDecrease = function () {
        if (this.par > 1) {
            this.par--;
        }
    };

    HoleModel.prototype.toSaveObject = function () {
        return new HoleSaveObject(this.holeNo, this.par);
    };
    HoleModel.CreateFromSavedHole = function (savedHole) {
        return new HoleModel(savedHole.holeNo, savedHole.par);
    };
    HoleModel.CreateFromSavedHoles = function (savedHoles) {
        var result = new Array();
        for (var i = 0; i < savedHoles.length; i++) {
            result.push(HoleModel.CreateFromSavedHole(savedHoles[i]));
        }
        return result;
    };
    return HoleModel;
})();

var CourseModel = (function () {
    function CourseModel(key, name, holes) {
        this.key = key;
        this.name = name;
        this.holes = holes;
        this.holeCount = this.holes.length;
    }
    CourseModel.FromSavedCourse = function (course) {
        return new CourseModel(course.key, course.name, HoleModel.CreateFromSavedHoles(course.holes));
    };

    CourseModel.NewCourse = function () {
        var newHoles = new Array();
        var newHoleCount = 18;
        while (newHoleCount > newHoles.length) {
            newHoles.push(new HoleModel(newHoles.length + 1, 3));
        }

        return new CourseModel(AuId.generateKey(), "", newHoles);
    };

    CourseModel.prototype.toSaveObject = function () {
        var holes = new Array();
        for (var i = 0; i < this.holes.length; i++) {
            holes.push(this.holes[i].toSaveObject());
        }
        return new CourseSaveObject(this.key, this.name, holes);
    };

    CourseModel.prototype.holeCountChange = function () {
        if (this.holeCount < this.holes.length) {
            this.holes.splice(this.holeCount, this.holes.length - this.holeCount);
        }

        while (this.holeCount > this.holes.length) {
            this.holes.push(new HoleModel(this.holes.length + 1, 3));
        }
    };
    return CourseModel;
})();
