/// <reference path='../../Controllers/CourseListController.ts' />
/// <reference path='../../Factories/StorageFactories.ts' />
/// <reference path='_all_unittests.d.ts' />


// Mock implementation of the DbHandler.
class dummyCourseFactory implements IDbHandler<CourseSaveObject> {
    public get(key: string, callback: (obj: CourseSaveObject) => void ) {
        var holes = new Array<HoleSaveObject>();
        holes.push(new HoleSaveObject(1, 3));
        holes.push(new HoleSaveObject(2, 4));

        callback(new CourseSaveObject('123', '123_NAME', holes));
    }

    public getAll(callback: (obj: Array<CourseSaveObject>) => void ) {
        var courses = new Array<CourseSaveObject>();
        courses.push(new CourseSaveObject('123', '123', null));
        courses.push(new CourseSaveObject('456', '456', null));
        callback(courses);
    }

    public save(obj: CourseSaveObject, callback: () => void ) {
        callback();
    }

    public remove(key: string, callback: () => void ) {
        callback();
    }
}


describe('CourseListControllerTests', () => {
    var scope: CourselistScope;
    var courses: IDbHandler<CourseSaveObject>;
    beforeEach(angular.mock.module('stadiscics'));

    beforeEach(angular.mock.inject(($rootScope, $controller, courseFactory) => {
        scope = $rootScope.$new();
        $rootScope.changePage = (page: string) => { };
        spyOn(scope, 'changePage');
        courses = new dummyCourseFactory();

        $controller('CourselistController', {
            $scope: scope,
            courseFactory: courses
        });
    
    }));



    it("CourselistController should been properly initlized", () => {
        expect(scope.courses.length).toBe(2);

    });

    it("Should open Course page when edit button is hit", () => {
        var course = new CourseSaveObject("MY_KEY", "TEST", null);
        scope.editCourse(course);
        expect(scope.changePage).toHaveBeenCalledWith('/course/' + course.key);
    });

    it("Should open Course page without key when add button is hit", () => {
        scope.addCourse();
        expect(scope.changePage).toHaveBeenCalledWith('/addCourse');
    });

});