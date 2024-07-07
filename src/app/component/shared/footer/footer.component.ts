import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicies/auth/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy{
  userLoginOn:boolean = false;
  constructor(  private router: Router, private AuthService:AuthService){}

  ngOnDestroy(): void {
    this.AuthService.currentUserData.unsubscribe()
    this.AuthService.currentUserLoginOn.unsubscribe()
  }

  navComponent(strUrl: string){
    this.router.navigate(['/'+strUrl])
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
