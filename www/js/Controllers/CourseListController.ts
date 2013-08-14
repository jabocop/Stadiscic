/// <reference path='..\_all.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='..\Models\CourseModel.ts' />
/// <reference path='..\Factories\StorageFactories.ts' />

interface CourselistScope extends BaseScope {
    courses: Array<CourseSaveObject>;
    editCourse: (course: CourseSaveObject) => void;
    
    addCourse: () => void;
}

class CourselistController {
  
    constructor(private $scope: CourselistScope, private courseFactory: DbHandler<CourseSaveObject>) {
        $scope.editCourse = (course) => this.editCourse(course);
       
        $scope.addCourse = () => this.addCourse();

        this.$scope.courses = new Array<CourseSaveObject>();
       
        this.courseFactory.getAll((courses) => { this.$scope.courses = courses;});
     }

    public editCourse(course: CourseSaveObject) {
        this.$scope.changePage('/course/' + course.key);
    }

    public addCourse() {
        this.$scope.changePage('/addCourse');
    }

}

