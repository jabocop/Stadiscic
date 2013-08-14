/// <reference path='..\lib\lawnchair\lawnchair.d.ts' />
var CourseModel = (function () {
    function CourseModel(name, holeCount, newItem) {
        this.name = name;
        this.holeCount = holeCount;
        this.newItem = newItem;
        this.caption = "Edit Course";
        this.holes = new Array();
        if (newItem) {
            this.caption = "Add Course";
        }
        this.key = this.GenerateId();
        this.holeCountChange();
    }
    CourseModel.Empty = function () {
        return new CourseModel("", 0, false);
    };

    CourseModel.prototype.holeCountChange = function () {
        if (this.holeCount < this.holes.length) {
            this.holes.splice(this.holeCount, this.holes.length - this.holeCount);
        }

        while (this.holeCount > this.holes.length) {
            this.holes.push(new HoleModel(this.holes.length + 1, 3));
        }
    };

    CourseModel.prototype.GenerateId = function () {
        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return id;
    };
    return CourseModel;
})();

var HoleModel = (function () {
    function HoleModel(holeNo, par) {
        this.holeNo = holeNo;
        this.par = par;
    }
    return HoleModel;
})();
//@ sourceMappingURL=CourseModel.js.map
