import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { BackendService } from '../backend.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private backendService: BackendService, 
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if(route.params['id']){
            let req = {
                id: route.params['id']
            }
            this.backendService.getHincha(req).subscribe(data => {
                if (data.success) { 
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            })
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
        
    }
}
