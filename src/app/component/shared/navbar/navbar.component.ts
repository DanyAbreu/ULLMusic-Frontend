import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicies/auth/auth.service';
import { Router } from '@angular/router';
// import { User } from 'src/app/servicies/auth/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userLoginOn: boolean = false
  userData: any;
  // userData?:User
  constructor(private router: Router, private AuthService: AuthService) { }


  navComponent(strUrl: string) {
    this.router.navigate(['/' + strUrl])
  }

  navSearch(strSearch: string) {
    this.router.navigate(['/search/', strSearch]);
  }

  onSubmit(event: Event, searchStr: string) {
    event.preventDefault();
    this.navSearch(searchStr);
  }


  ngOnDestroy(): void {
    this.AuthService.currentUserData.unsubscribe()
    this.AuthService.currentUserLoginOn.unsubscribe()
  }

  ngOnInit(): void {
    this.AuthService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn
      }
    })
  }
}
