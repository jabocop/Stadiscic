/// <reference_path='../_all.d.ts' />
/// <reference path='../Factories/PageNavFactory.ts' />
interface BaseScope extends ng.IScope {
    changePage: (path: string) => void;
    navigateBack: () => void;
    title: string;
    $$phase: any;
   
}

class BaseController {
    private baseScope: BaseScope;
    constructor($scope: BaseScope, private pageNavFactory:PageNavFactory) {
        this.baseScope = $scope;
        $scope.changePage = (path: string) => this.changePage(path);
        $scope.navigateBack = () => this.navigateBack();
        $scope.$on('$routeChangeSuccess', (event, current, previous) => {

            if (current.$$route === undefined) {
                $scope.title = '';
            }
            else {
                var tmpTitle: string = current.$$route.title;
                if (current.params.holeIndex !== undefined) {
                    tmpTitle = tmpTitle.replace('{$hole$}', current.params.holeIndex);
                }
                $scope.title = tmpTitle;
            }
           
        });
    }
    
    public changePage(path: string): void {
        this.pageNavFactory.slidePage(path, MobileNavTransitions.slide);
        this.safeApply();
        
    }

    public navigateBack(): void {
        this.pageNavFactory.back();
        this.safeApply();
    }

    private safeApply(): void {
        if (!this.baseScope.$$phase) {
            this.baseScope.$apply();
        }
    }
    
    
}
