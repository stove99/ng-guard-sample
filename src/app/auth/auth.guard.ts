import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.auth.isLogin().pipe(
            map(result => {
                if (result.login) {
                    return true;
                }

                alert('로그인이 필요합니다');
                this.router.navigate(['/login']);
                return false;
            }),
            catchError((error) => {
                alert('로그인이 필요합니다');
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }

}
