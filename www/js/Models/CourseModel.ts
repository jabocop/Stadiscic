/// <reference path='..\..\lib\lawnchair\lawnchair.d.ts' />
/// <reference path='..\_all.d.ts' />

class CourseSaveObject implements ISaveObject {
    constructor(public key: string, public name: string, public holes: Array<HoleSaveObject>) {
    }
}

class HoleSaveObject {
    constructor(public holeNo: number, public par: number) {
    }
}



class HoleModel {
    constructor(public holeNo: number, public par: number) {

    }
    public parIncrease(): void {
        this.par++;
    }
    public parDecrease(): void {
        if (this.par > 1) {
            this.par--;
        }
    }

    public toSaveObject(): HoleSaveObject {
        return new HoleSaveObject(this.holeNo, this.par);
    }
    public static CreateFromSavedHole(savedHole: HoleSaveObject): HoleModel {
        return new HoleModel(savedHole.holeNo, savedHole.par);
    }
    public static CreateFromSavedHoles(savedHoles: Array<HoleSaveObject>): Array<HoleModel> {
        var result = new Array<HoleModel>();
        for (var i = 0; i < savedHoles.length; i++) {
            result.push(HoleModel.CreateFromSavedHole(savedHoles[i]));
        }
        return result;
    }

}

class CourseModel {
    
    public holeCount: number;

    constructor(public key: string, public name: string, public holes: Array<HoleModel>) {
        this.holeCount = this.holes.length;
    }

    public static FromSavedCourse(course: CourseSaveObject): CourseModel {
        return new CourseModel(course.key, course.name, HoleModel.CreateFromSavedHoles(course.holes));
    }

    public static NewCourse(): CourseModel {
        var newHoles = new Array<HoleModel>();
        var newHoleCount: number = 18;
        while (newHoleCount > newHoles.length) {
            newHoles.push(new HoleModel(newHoles.length + 1, 3));
        }

        return new CourseModel(AuId.generateKey(), "", newHoles);
    }

    


    public toSaveObject(): CourseSaveObject {
        var holes = new Array<HoleSaveObject>();
        for ( var i:number = 0; i < this.holes.length;i++) {
            holes.push(this.holes[i].toSaveObject());
        }
        return new CourseSaveObject(this.key, this.name, holes);
    }
    
    
    public holeCountChange(): void {
        if (this.holeCount < this.holes.length) {
            this.holes.splice(this.holeCount, this.holes.length - this.holeCount);
        }

        while (this.holeCount > this.holes.length) {
            this.holes.push(new HoleModel(this.holes.length + 1, 3));
        
        }
    
    }
}


