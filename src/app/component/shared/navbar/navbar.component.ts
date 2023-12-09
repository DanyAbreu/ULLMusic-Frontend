import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicies/auth/auth.service';
// import { User } from 'src/app/servicies/auth/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  userLoginOn:boolean = false
  // userData?:User
  constructor(private AuthService:AuthService){}

  ngOnDestroy(): void {
    this.AuthService.currentUserData.unsubscribe()
    this.AuthService.currentUserLoginOn.unsubscribe()
  }

  ngOnInit(): void{
    this.AuthService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn
      }
    })

    // this.AuthService.currentUserData.subscribe({
    //   next:(userData)=>{
    //     this.userData=userData
    //   }
    // })
  }
}
