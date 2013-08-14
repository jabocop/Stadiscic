/// <reference path='..\_all.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='..\Models\CourseModel.ts' />
/// <reference path='..\Factories\StorageFactories.ts' />

interface ICourseScope extends BaseScope {
    course: CourseModel;
    newCourse: boolean;
    onCancel: () => void;
    onDelete: () => void;
    onSave: () => void;
    onAddHole: () => void;
    onRemoveHole: () => void;
    onParDecrease: (hole: HoleModel) => void;
    onParIncrease: (hole: HoleModel) => void;
    onAfterEdit: () => void;
}

interface ICourseParams {
    courseId:string

}

class CourseController {
   
    constructor(private $scope: ICourseScope, $routeParams: ICourseParams, private courseFactory: DbHandler<CourseSaveObject>) {
        
        $scope.newCourse = true;
        $scope.course = CourseModel.NewCourse();

        $scope.onSave = () => this.saveCourse();
        $scope.onDelete = () => this.deleteCourse();
        $scope.onCancel = () => this.cancel();
        $scope.onAddHole = () => this.addHole();
        $scope.onRemoveHole = () => this.removeHole();
        $scope.onParDecrease = (hole: HoleModel) => this.parDecrease(hole);
        $scope.onParIncrease = (hole: HoleModel) => this.parIncrease(hole);
        $scope.onAfterEdit = () => this.afterEdit();
        

        var courseKey = $routeParams.courseId;
        if (courseKey !== undefined) {
           
            $scope.newCourse = false;
            this.courseFactory.get(courseKey, (course) => { this.setCourse( course); });
        }
        
    }

    public setCourse(course: CourseSaveObject) {
        this.$scope.course = CourseModel.FromSavedCourse(course);
    
    }

    public addHole(): void {
        this.$scope.course.holeCount++;
        this.$scope.course.holeCountChange();
    }

    public removeHole(): void {
        if (this.$scope.course.holeCount > 1) {
            this.$scope.course.holeCount--;
            this.$scope.course.holeCountChange();
        }
    }

    public saveCourse(): void {
        this.courseFactory.save(this.$scope.course.toSaveObject(),this.$scope.onAfterEdit);
    }

    public deleteCourse(): void {
        this.courseFactory.remove(this.$scope.course.key, this.$scope.onAfterEdit);
    }

    public cancel(): void {
        this.afterEdit();
    }

    public parDecrease(hole: HoleModel) {
        hole.parDecrease();
    }

    public parIncrease(hole: HoleModel) {
        hole.parIncrease();
    }

    public afterEdit(): void {
        this.$scope.changePage("/courselist");
       
        
    }
}