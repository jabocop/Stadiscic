/// <reference path='../../Controllers/CourseController.ts' />
/// <reference path='../../Factories/StorageFactories.ts' />
/// <reference path='_all_unittests.d.ts' />
/// <reference path='CourseListControllerTests.ts' />




describe('CourseControllerTests - New Course', () => {
    var scope:ICourseScope;
    var courses: IDbHandler<CourseSaveObject>;
    var routeParams: ICourseParams;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(($rootScope, $controller, $routeParams,courseFactory) => {
        scope = $rootScope.$new();
        //Setup base contoller
        $rootScope.changePage = (page: string) => { };
        spyOn(scope, 'changePage');
        
        courses = new dummyCourseFactory();
        spyOn(courses, 'save').andCallThrough();
        spyOn(courses, 'remove').andCallThrough();
        spyOn(CourseModel, 'NewCourse').andCallThrough();

        routeParams = $routeParams;
        routeParams.courseId = undefined;

        $controller('CourseController', {
            $scope: scope,
            $routeParams : routeParams,
            courseFactory: courses
        });
        
    }));

    it("Should be marked as a new course", () => {
        expect(scope.newCourse).toBe(true);    
    });

    it("New course should be initilized", () => {
        expect(CourseModel.NewCourse).toHaveBeenCalled();
    });

    it("Should return to courseList when cancel", () => {
        scope.onCancel();
        expect(scope.changePage).toHaveBeenCalledWith("/courselist");
    });

    it("Should call save on dbFactory and after that load courseList onSave", () => {
        scope.onSave();
        expect(courses.save).toHaveBeenCalled();
        expect(scope.changePage).toHaveBeenCalledWith("/courselist");
    });

    it("Should call remove on dbFactory and after that load courseList onDelete", () => {
        scope.onDelete();
        expect(courses.remove).toHaveBeenCalled();
        expect(scope.changePage).toHaveBeenCalledWith("/courselist");
    });

    it("Should increase number of holes on addHole", () => {
        scope.onAddHole();
        expect(scope.course.holeCount).toBe(19);
        expect(scope.course.holes.length).toBe(19);
    });

    it("Should decrease number of holes on removeHole", () => {
        scope.onRemoveHole();
        expect(scope.course.holeCount).toBe(17);
        expect(scope.course.holes.length).toBe(17);
    });

    it("Should raise the par of a hole on ParIncrease", () => {
        var hole = scope.course.holes[0];
        expect(hole.par).toBe(3);
        scope.onParIncrease(hole);
        expect(hole.par).toBe(4);
     });


    it("Should decrease the par of a hole on ParDecrease", () => {
        var hole = scope.course.holes[0];
        expect(hole.par).toBe(3);
        scope.onParDecrease(hole);
        expect(hole.par).toBe(2);
    });

    
});


describe('CourseControllerTests - Edit Course', () => {
    var scope: ICourseScope;
    var courses: IDbHandler<CourseSaveObject>;
    var routeParams: ICourseParams;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(($rootScope, $controller, $routeParams, courseFactory) => {
        scope = $rootScope.$new();
        //Setup base contoller
        $rootScope.changePage = (page: string) => { };
        spyOn(scope, 'changePage');
        spyOn(CourseModel, 'FromSavedCourse').andCallThrough();

        courses = new dummyCourseFactory();
        spyOn(courses, 'get').andCallThrough();
        routeParams = $routeParams;
        routeParams.courseId = "MY_KEY";

        $controller('CourseController', {
            $scope: scope,
            $routeParams: routeParams,
            courseFactory: courses
        });
    
    }));

    it("Course should be fetched from db factory", () => {
        expect(courses.get).toHaveBeenCalled();
    });

    it("Should be marked as a edit course", () => {
        expect(scope.newCourse).toBe(false);
    });

    it("Course should be fecthed from db", () => {
        expect(CourseModel.FromSavedCourse).toHaveBeenCalled();
       
    });

    it("Number of holes should not be decreased lower than 1", () => {
        scope.onRemoveHole(); 
        expect(scope.course.holeCount).toBe(1);
        scope.onRemoveHole();
        expect(scope.course.holeCount).toBe(1);
        expect(scope.course.holes.length).toBe(1);
    });

});

