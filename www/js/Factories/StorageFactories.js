var DbHandler = (function () {
    function DbHandler(name) {
        this.name = name;
    }
    DbHandler.prototype.get = function (key, callback) {
        Lawnchair({ name: this.name, adaptor: 'webkit' }, function (db) {
            db.get(key, function (course) {
                callback(course);
            });
        });
    };

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

var CourseFactory = (function () {
    function CourseFactory() {
        this.dbHandler = new DbHandler("CourseTable");
    }
    CourseFactory.prototype.GetAll = function (callback) {
        this.dbHandler.getAll(function (courses) {
            callback(courses);
        });
    };
    return CourseFactory;
})();
