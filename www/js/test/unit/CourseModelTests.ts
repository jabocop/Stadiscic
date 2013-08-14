/// <reference path='../../Controllers/CourseListController.ts' />
/// <reference path='../../Factories/StorageFactories.ts' />
/// <reference path='_all_unittests.d.ts' />


describe('CourseModelTests', () => {
    it("A new CourseModel should be properly initilized", () => {
        var newModel = CourseModel.NewCourse();
        expect(newModel.name).toBe("");
        expect(newModel.key).not.toBeNull();
        expect(newModel.holes.length).toBe(18);
        expect(newModel.holeCount).toBe(18);
        expect(newModel.holes[4].holeNo).toBe(5);
        expect(newModel.holes[4].par).toBe(3);
    });

    it("A loaded course should be properly loaded", () => {
        
        //Setup
        //Mock stored course
        var holes = new Array<HoleSaveObject>();
        holes.push(new HoleSaveObject(1, 3));
        holes.push(new HoleSaveObject(2, 4));

        var storedCourse = new CourseSaveObject('123', '123_NAME', holes);
        
        //Execute
        var loadedModel = CourseModel.FromSavedCourse(storedCourse);

        expect(loadedModel.name).toBe("123_NAME");
        expect(loadedModel.key).toBe("123");
        expect(loadedModel.holes.length).toBe(2);
        expect(loadedModel.holeCount).toBe(2);
        expect(loadedModel.holes[0].holeNo).toBe(1);
        expect(loadedModel.holes[0].par).toBe(3);
        expect(loadedModel.holes[1].holeNo).toBe(2);
        expect(loadedModel.holes[1].par).toBe(4);

    });

    it('GenerateId should produce id:s with the length 36 ', () => {
        var player = CourseModel.NewCourse();
        expect(player.key.length).toBe(36);

    });

    it('Two id:s should not be the same', () => {
        var player1 = CourseModel.NewCourse();
        var player2 = CourseModel.NewCourse();
        expect(player1.key).not.toBe(player2.key);

    });

    

    it('Should create a saveObject with correct values', () => {
        //Setup
        //Mock stored course
        var holes = new Array<HoleModel>();
        holes.push(new HoleModel(1, 3));
        holes.push(new HoleModel(2, 4));

        var course = new CourseModel('123', '123_NAME', holes);
        spyOn(course.holes[0], 'toSaveObject').andCallThrough();
        spyOn(course.holes[1], 'toSaveObject').andCallThrough();
        var objToSave = course.toSaveObject();

        expect(course.holes[0].toSaveObject).toHaveBeenCalled();
        expect(course.holes[1].toSaveObject).toHaveBeenCalled();
        expect(objToSave.holes.length).toBe(2);
        expect(objToSave.name).toBe('123_NAME');
        expect(objToSave.key).toBe('123');
    });

});



describe('HoleModelTests', () => {
    it("A new HoleModel should be properly initilized", () => {
        var hole = new HoleModel(1, 3);
        expect(hole.holeNo).toBe(1);
        expect(hole.par).toBe(3);
    
    });

    it('Should be properly initialized when loaded stored hole', () => {
        var dbHole = new HoleSaveObject(1, 2);
        var hole = HoleModel.CreateFromSavedHole(dbHole);
        expect(hole.holeNo).toBe(dbHole.holeNo);
        expect(hole.par).toBe(dbHole.par);

    });

    it('Array of holes should be properly loaded from SaveObj', () => {
        var dbHoles = new Array<HoleSaveObject>();
        var hole1 = new HoleSaveObject(1, 2);
        var hole2 = new HoleSaveObject(3, 4);
        dbHoles.push(hole1);
        dbHoles.push(hole2);
        spyOn(HoleModel, 'CreateFromSavedHole').andCallThrough();
        var holes = HoleModel.CreateFromSavedHoles(dbHoles);
        HoleModel.CreateFromSavedHole
        expect(HoleModel.CreateFromSavedHole).toHaveBeenCalledWith(hole1);
        expect(HoleModel.CreateFromSavedHole).toHaveBeenCalledWith(hole2);
        expect(holes.length).toBe(2);

    });

    it("ParIncrease should increase the par", () => {
        var hole = new HoleModel(1, 3);
        hole.parIncrease();
        expect(hole.par).toBe(4);
    

    });

    it("ParDecrease should decrease the par", () => {
        var hole = new HoleModel(1, 3);
        hole.parDecrease();
        expect(hole.par).toBe(2);
    

    });

    it("ParDecrease should never decrease par below 1", () => {
        var hole = new HoleModel(1, 2);
        hole.parDecrease();
        expect(hole.par).toBe(1);
        hole.parDecrease();
        expect(hole.par).toBe(1);
    });

    it('Should create a proper saveObject', () => {
        var hole = new HoleModel(1, 2);
        var objToSave = hole.toSaveObject();
        expect(objToSave.holeNo).toBe(1);
        expect(objToSave.par).toBe(2);

    });



});