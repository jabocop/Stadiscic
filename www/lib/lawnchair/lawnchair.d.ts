
    interface ILawnchairConstruct {
        table?: string;
        name?: string;
        adaptor?: string;
    }
    interface ISaveObject {
        key: string;

    }

    interface ILawnchair<T extends ISaveObject> {
        (params: ILawnchairConstruct,callback:()=>void): void;
        save(obj: ISaveObject, callback: (obj: T) => void );
        get(key: string, callback: (obj: T) => void );
        all(callback: (obj: Array<T>) => void );
        remove(key: string, callback: (obj: T) => void );
    }

    interface ILawnchairStatic {
        (params: ILawnchairConstruct,callback: (db:ILawnchair<ISaveObject>) => void): ILawnchair;
    }

declare var Lawnchair: ILawnchairStatic;


