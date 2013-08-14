/// <reference path='..\lib\Angular\angular.d.ts' />
/// <reference path='..\lib\jquery\jquery.d.ts' />
/// <reference path='..\lib\jquerymobile\jquerymobile.d.ts' />
/// <reference path='..\lib\lawnchair\lawnchair.d.ts' />
/// <reference path='CourseModel.ts' />
interface ApplicationScope extends ng.IScope {
    courses: Array<CourseModel>;
    activeCourse: CourseModel;
    editCourse: (course: CourseModel) => void;
    deleteCourse: (course: CourseModel) => void;
    saveCourse: (course: CourseModel) => void;
    cancelCourseEdit: () => void;
    addCourse: () => void;
}



class DbHandler<T extends ISaveObject> {
    constructor(private name: string) {
    }

    public getAll(callback: (obj: Array<T>)=>void) {
        Lawnchair<CourseModel>({ name: this.name, adaptor: 'webkit' },
            (db: ILawnchair<T>) => {
                db.all((courses) => { callback(courses); });
            });
    }

    public save(obj:T, callback: () => void ) {
        Lawnchair<CourseModel>({ name: this.name, adaptor: 'webkit' },
            (db: ILawnchair<T>) => {
                db.save(obj,() => { callback(); });
            });
    }

    public remove(key: string, callback: () => void ) {
        Lawnchair<CourseModel>({ name: this.name, adaptor: 'webkit' },
            (db: ILawnchair<T>) => {
                db.remove(key, () => { callback(); });
            });
    }

}

class CourseDbHandler extends DbHandler<CourseModel> {
    constructor() {
        super("CourseTable");
    }
}


class ApplicationController {
    
    private db: CourseDbHandler;
    constructor(private $scope: ApplicationScope) {
        $scope.courses = new Array<CourseModel>();
        this.db = new CourseDbHandler();
        this.db.getAll((courses) => { this.$scope.courses = courses; });
        
        $scope.activeCourse = CourseModel.Empty();

        $scope.editCourse = (course) => this.editCourse(course);
        
        $scope.deleteCourse = (course) => this.deleteCourse(course);
        $scope.addCourse = () => this.addCourse();
        $scope.saveCourse = (course) => this.saveCourse(course);
        $scope.cancelCourseEdit = () => this.cancelCourseEdit();
        
    }

    public editCourse(course:CourseModel) {
        this.$scope.activeCourse = angular.copy(course);
        $.mobile.changePage("#EditCourse");
    }

    public addCourse() {
        this.$scope.activeCourse = new CourseModel("", 18, true);
        $.mobile.changePage("#EditCourse");
    }

    public deleteCourse(course:CourseModel) {
        this.db.remove(course.key, () => {
            this.endCourseEdit();
        });
        
    }

    public saveCourse(course: CourseModel) {
        this.db.save(course, () => { this.endCourseEdit(); });
    }

    public cancelCourseEdit() {
        this.endCourseEdit();
       
    }

    public endCourseEdit() {
        this.$scope.activeCourse = CourseModel.Empty();
        this.db.getAll((courses) => {
            this.$scope.courses = courses;
            $.mobile.changePage("#Courses");
        });
        
        
    }

}