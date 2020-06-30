import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    login(): void {
        this.auth.login({ id: 'test', password: 'pwd' }).subscribe(result => {
            if (result.login) {
                this.router.navigate(['/auth']);
            }
        });
    }

}
