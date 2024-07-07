import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/servicies/back/data.service';
import { AuthService } from 'src/app/servicies/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Album } from './album.model';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {

  idAlb!: string;
  album!: Album;
  isLoading: boolean = false;
  currentPage = 1;
  tracksPerPage = 10;

  playingIndex: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private DataService: DataService, private AuthService:AuthService) { }

  //--------------------------------------------------------//
  // Paginación de Tracks

  get paginatedTracks() {
    const startIndex = (this.currentPage - 1) * this.tracksPerPage;
    const endIndex = startIndex + this.tracksPerPage;
    return this.album.tracks.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.album.tracks.length / this.tracksPerPage);
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  navArtist(idArt: string) {
    this.router.navigate(['/artist/', idArt]);
  }

  //--------------------------------------------------------//
  // Métodos para gestionar Users Likes

  idUser: number = 0;
  userLoginOn: boolean = false;

  userLikesAlbum() {
    if (this.idAlb) {
      this.DataService.userLikesAlbum(this.idAlb, this.idUser).subscribe(
        (data) => {
          this.album.userLike = data;
        }
      )
    }
  }

  findTrackById(idTrack: string){
    return this.album.tracks.find(track => track.idTrack === idTrack)
  }

  userlikesTrack(idTrack:string, userLike: boolean) {
    const track = this.findTrackById(idTrack);
    this.DataService.userLikesTrack(idTrack, this.idUser). subscribe(
      (data) => {
        if (track) {
          track.userLike = data;
        }
      }
    )
  }

  //----------------------------------------------------------------//

  ngOnInit(): void {
    // Comprueba si el usuario está logeado
    this.AuthService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
    // obtiene el ID del usuario
    if (this.userLoginOn) {
      this.AuthService.userData.subscribe({
        next:(userData) => {
          this.idUser = userData.id;
        }
      })
    }
    this.route.params.subscribe(params => {
      this.idAlb = params['idAlb'];
      if (this.idAlb) {
        this.DataService.getAlbum(this.idAlb, this.idUser).subscribe(
          (data) => {
            this.album = data;
            this.isLoading = true;
          }
        );
      }
    });
  }


  isPlaying = false;
  audioPlayer!: HTMLAudioElement;

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

  ngAfterViewInit() {
    this.audioPlayer = this.audioPlayerRef.nativeElement;
  }

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

}
