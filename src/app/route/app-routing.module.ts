import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from '../component/news/news.component';
import { LoginComponent } from '../component/auth/login/login.component';
import { RegisterComponent } from '../component/auth/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
  { path: 'inicio', component: NewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }