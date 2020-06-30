import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { SampleNoauthComponent } from './sample-noauth/sample-noauth.component';
import { SampleAuthComponent } from './sample-auth/sample-auth.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'no-auth', component: SampleNoauthComponent },
    { path: 'auth', component: SampleAuthComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
