/// <reference path='..\_all.d.ts' />
/// <reference path='..\Models\CourseModel.ts' />

interface IDbHandler<T extends ISaveObject> {
    get(key: string, callback: (obj: T) => void );
    getAll(callback: (obj: Array<T>) => void );
    save(obj: T, callback: () => void );
    remove(key: string, callback: () => void );
}


class DbHandler<T extends ISaveObject> implements IDbHandler<T> {
    constructor(private name: string) {
    }

    public get(key:string, callback: (obj: T) => void ) {
        Lawnchair<T>({ name: this.name, adaptor: 'webkit' },
            (db: ILawnchair<T>) => {
                db.get(key, (course) => {
                    callback(course);
                });
            });
    }
    
    public getAll(callback: (obj: Array<T>) => void ) {
        Lawnchair<T>({ name: this.name, adaptor: 'webkit' },
            (db: ILawnchair<T>) => {
                db.all((courses) => { callback(courses); });
            });
    }

    public save(obj: T, callback: () => void ) {
        Lawnchair<T>({ name: this.name, adaptor: 'webkit' },
            (db: ILawnchair<T>) => {
                db.save(obj, () => { callback(); });
            });
    }

    public remove(key: string, callback: () => void ) {
        Lawnchair<T>({ name: this.name, adaptor: 'webkit' },
            (db: ILawnchair<T>) => {
                db.remove(key, () => { callback(); });
            });
    }

}

class CourseFactory  {
    private dbHandler: DbHandler<CourseSaveObject>;
    constructor() {
        this.dbHandler = new DbHandler<CourseSaveObject>("CourseTable");
    }

    public GetAll(callback: (obj: Array<CourseSaveObject>) => void): void {
        this.dbHandler.getAll((courses) => { callback(courses); });
    }
}
