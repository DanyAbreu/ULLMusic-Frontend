import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/servicies/back/data.service';
import { AuthService } from 'src/app/servicies/auth/auth.service';
import { Artist, Album, Track } from './artist.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {
  idArt!: string;
  artist!: Artist;

  readMore = false;

  constructor(private route: ActivatedRoute, private router: Router, private DataService: DataService, private AuthService:AuthService) { }

  //--------------------------------------------------------//
  // Paginación de Tracks

  currentPage = 1;
  tracksPerPage = 10; 
  playingIndex: number | null = null;

  get paginatedTracks() {
    const startIndex = (this.currentPage - 1) * this.tracksPerPage;
    const endIndex = startIndex + this.tracksPerPage;
    return this.artist.tracks.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.artist.tracks.length / this.tracksPerPage);
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
  // Métodos para gestionar Users Likes

  idUser:number = 0;
  userLoginOn:boolean = false;

  userLikesArtist() {
    this.route.params.subscribe(params => {
      this.idArt = params['idArt'];
      if (this.idArt) {
        this.DataService.userLikesArtist(this.idArt, this.idUser).subscribe(
          (data) => {
            this.artist.userLike = data;
          }
        )
      }
    });
  }

  findAlbumById(idAlb: string){
    return this.artist.albums.find(album => album.idAlb === idAlb)
  }

  userlikesAlb(idAlb: string) {
    const album = this.findAlbumById(idAlb);
    this.DataService.userLikesAlbum(idAlb, this.idUser). subscribe(
      (data) => {
        if (album) {
          album.userLike = data;
        }
      }
    )
  }

  findTrackById(idTrack: string){
    return this.artist.tracks.find(track => track.idTrack === idTrack)
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

  //--------------------------------------------------------//
  // Método para navegar al componente Album
  
  navAlbum(idAlb: string) {
    this.router.navigate(['/album/', idAlb]);
  }

  //--------------------------------------------------------//
  // Método para insertar info de la biografía del artista

  readSummary(): void {
    const contentDiv = document.getElementById('summary');
    if (this.readMore == false) {
      this.readMore = true;
      if (contentDiv) {
        contentDiv.innerHTML = this.artist.content;
      }
    } else {
      this.readMore = false;
      if (contentDiv) {
        contentDiv.innerHTML = this.artist.summary;
      }
    }
  }

  //--------------------------------------------------------//
  // Método que se ejecuta al visualizar el componente, hace petición al Back-End

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
    // Obtiene los datos del artista
    this.route.params.subscribe(params => {
      this.idArt = params['idArt'];
      if (this.idArt) {
        this.DataService.getArtist(this.idArt, this.idUser).subscribe(
          (data) => {
            this.artist = data;
          }
        )
      }
      const contentDiv = document.getElementById('summary');
      if (contentDiv) {
        contentDiv.innerHTML = this.artist.summary;
      }
    });
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

}
