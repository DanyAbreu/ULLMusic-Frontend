import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicies/auth/auth.service';
import { DataService } from 'src/app/servicies/back/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private AuthService:AuthService, private DataService: DataService ,private router: Router){}

  userLoginOn!: boolean;
  user!: any;
  userLikes!: any;

  ngOnInit(): void {
    this.AuthService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    if (this.userLoginOn) {
      this.AuthService.userData.subscribe({
        next:(userData) => {
          this.user = userData;
        }
      })

      this.DataService.getUserLikes(this.user.id).subscribe(
        (data) => {
          this.userLikes = data;
        }
      )

    }else{
      this.router.navigate(['/login']);
    }
  }

  navArtist(idArt: string) {
    this.router.navigate(['/artist/', idArt]);
  }
  navAlbum (idAlb:string){
    this.router.navigate(['/album/',idAlb]);
  }

}
