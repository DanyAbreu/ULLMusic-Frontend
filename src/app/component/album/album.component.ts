import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/servicies/back/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {

  idAlb!: string;
  album!: any;
  currentPage = 1;
  tracksPerPage = 10;

  playingIndex: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private DataService: DataService){}

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

  navArtist (idArt:string){
    this.router.navigate(['/artist/',idArt]);
  }

  
  //----------------------------------------------------------------//

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.idAlb = params['idAlb'];
      if (this.idAlb) {
        this.DataService.getAlbum(this.idAlb).subscribe(
          (data) => {
            this.album = data;
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
