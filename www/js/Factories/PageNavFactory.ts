/// <reference path='..\_all.d.ts' />
class MobileNavTransitions {
    // boilerplate 
    constructor(public value: string) {
    }

    toString() {
        return this.value;
    }

    // values 
    static slide = new MobileNavTransitions("slide");
    static modal = new MobileNavTransitions("modal");
    static none = new MobileNavTransitions("none");
}

class PageNavFactory {
    
    constructor(private $navigate: IMobileNavigate) {
    
    }
    public slidePage(path: string, transition: MobileNavTransitions): void {
        this.$navigate.go(path, transition.toString());
    }

    public back(): void {
        this.$navigate.back();
    }
}



