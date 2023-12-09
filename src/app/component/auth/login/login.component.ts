import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicies/auth/auth.service';
import { LoginRequest } from 'src/app/servicies/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginError:string=''

  constructor(private formBuilder:FormBuilder, private router:Router, private AuthService: AuthService){}

  loginForm = this.formBuilder.group({
    username:['', Validators.required],
    passwd:['', Validators.required],
  })

  login(){
    if(this.loginForm.valid){
      this.AuthService.login(this.loginForm.value as LoginRequest).subscribe({
        next(userData) {
          console.log(userData)
        },
        error: (errorData) => {
          console.log(errorData)
          this.loginError = errorData;
        },
        complete:()=>{
          console.info("Login Completo")
          this.router.navigateByUrl('/')
          this.loginForm.reset()
        }
      })
    }else{
      this.loginForm.markAllAsTouched()
      alert("ERROR AL INTRODUCIR LOS DATOS")
    }
  }

  get username(){
    return this.loginForm.controls.username
  }
  get password(){
    return this.loginForm.controls.passwd
  }

}
