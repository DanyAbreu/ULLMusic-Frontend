import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicies/auth/auth.service';
import { RegisterRequest } from 'src/app/servicies/auth/registerRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerError:string=''

  constructor(private formBuilder:FormBuilder, private router:Router, private AuthService: AuthService){}

  registerForm = this.formBuilder.group({
    username:['',Validators.required],
    address:['', [Validators.required,Validators.email]],
    passwd:['', Validators.required],
  })

  register(){
    if(this.registerForm.valid){
      this.AuthService.register(this.registerForm.value as RegisterRequest).subscribe({
        next(userData) {
          console.log(userData)
        },
        error: (errorData) => {
          console.log(errorData)
          this.registerError = errorData;
        },
        complete:()=>{
          console.info("Usuario Creado, Login Correcto")
          this.router.navigateByUrl('/')
          this.registerForm.reset()
        }
      })
    }else{
      this.registerForm.markAllAsTouched()
      alert("ERROR AL INTRODUCIR LOS DATOS")
    }
  }
  get username(){
    return this.registerForm.controls.username
  }
  get address(){
    return this.registerForm.controls.address
  }
  get password(){
    return this.registerForm.controls.passwd
  }

}
