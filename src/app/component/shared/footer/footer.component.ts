import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicies/auth/auth.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy{
  userLoginOn:boolean = false;
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
