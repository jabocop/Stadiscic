/// <reference path='..\lib\lawnchair\lawnchair.d.ts' />
class CourseModel implements ISaveObject {
    public key: string;
    public caption: string;
    public holes: Array<HoleModel>;


    constructor(public name: string, public holeCount: number,public newItem:boolean) {
        this.caption = "Edit Course";
        this.holes = new Array<HoleModel>();
        if (newItem) {
            this.caption = "Add Course";
        }
        this.key = this.GenerateId();
        this.holeCountChange();
    }

    public static Empty(): CourseModel {
        return new CourseModel("", 0, false);
    }

    public holeCountChange() {
        if (this.holeCount < this.holes.length) {
            this.holes.splice(this.holeCount, this.holes.length - this.holeCount);
           
        }
        
        while (this.holeCount > this.holes.length) {
            this.holes.push(new HoleModel(this.holes.length+1,3));
            
        }
       
    }

    private GenerateId(): string {
        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return id;
    }


}

class HoleModel {
    
    constructor(public holeNo: number, public par: number) {
    
    }
}

