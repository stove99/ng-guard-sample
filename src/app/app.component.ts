import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `
        <h1>angular guard sample</h1>
        <p><button *ngIf="(login$ | async)" (click)="logout()">로그아웃</button></p>
        <ul>
            <li><a routerLink="/login">로그인</a></li>
            <li><a routerLink="/auth">로그인 필요 페이지</a></li>
            <li><a routerLink="/no-auth">로그인 불필요 페이지</a></li>
        </ul>

        <br/>

        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    login$;

    constructor(private auth: AuthService, private router: Router) {
        this.login$ = auth.login$;
    }

    logout(): void {
        this.auth.logout().subscribe(() => {
            this.router.navigate(['/login']);
        });
    }
}
