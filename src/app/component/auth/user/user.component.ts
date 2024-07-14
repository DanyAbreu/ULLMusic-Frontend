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

  isLoading = false;
  userLoginOn!: boolean;
  user!: any;
  userLikes!: any;

   //--------------------------------------------------------//
  // Paginación de Tracks

  currentPage = 1;
  tracksPerPage = 10; 
  playingIndex: number | null = null;

  get paginatedTracks() {
    const startIndex = (this.currentPage - 1) * this.tracksPerPage;
    const endIndex = startIndex + this.tracksPerPage;
    return this.userLikes.tracks.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.userLikes.tracks.length / this.tracksPerPage);
  }
  
  get paginationRange() {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i < totalPages && i > 1) {
        range.push(i);
      }
    }
    range.push(totalPages);

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  isNumber(value: any): value is number {
    return typeof value === 'number';
  }

  //--------------------------------------------------------//
  // Reproductor de previews

  togglePlayPause(audioPlayer: HTMLAudioElement, index: number) {
    if (this.playingIndex === index) {
      audioPlayer.pause();
      this.playingIndex = null;
    } else {
      if (this.playingIndex !== null) {
        const previousAudioPlayer = document.querySelector(`audio[data-index="${this.playingIndex}"]`) as HTMLAudioElement;
        if (previousAudioPlayer) {
          previousAudioPlayer.pause();
        }
      }
      audioPlayer.play();
      this.playingIndex = index;
    }
  }

  //--------------------------------------------------------//

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
          this.isLoading = true;
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
