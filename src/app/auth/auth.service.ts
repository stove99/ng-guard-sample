import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginSubj: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public login$ = this.loginSubj.asObservable();


    constructor(private http: HttpClient) {
        this.loginSubj.next(localStorage.getItem('token') != null);
    }

    isLogin(): Observable<{ login: boolean }> {
        // return this.http.get('serverUrl/checkToken');

        return of({
            login: this.loginSubj.getValue()
        });
    }

    login(info: { id: string, password: string }): Observable<{ login: boolean }> {
        const { id, password } = info;
        console.log(`id : ${id}, password : ${password}`);

        return of({
            login: true,
            token: 'xxxxxxxxxxxxxxxx'
        }).pipe(
            tap(result => {
                if (result.login) {
                    localStorage.setItem('token', result.token);
                } else {
                    alert('로그인 정보가 일치하지 않습니다.');
                }

                this.loginSubj.next(result.login);
            }),
            map(result => ({ login: result.login }))
        );
    }

    logout(): Observable<boolean> {
        localStorage.removeItem('token');
        this.loginSubj.next(false);

        return of(true);
    }
}
