import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/servicies/back/data.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {
  idArt!: string;
  artist!: any;
  currentPage = 1;
  tracksPerPage = 10;

  constructor(private route: ActivatedRoute, private router: Router, private DataService: DataService){}

  get paginatedTracks() {
    const startIndex = (this.currentPage - 1) * this.tracksPerPage;
    const endIndex = startIndex + this.tracksPerPage;
    return this.artist.tracks.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.artist.tracks.length / this.tracksPerPage);
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  // Metodo para navegar al componente Album
  navAlbum (idAlb:string){
    this.router.navigate(['/album/',idAlb]);
  }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.idArt = params['idArt'];
      if (this.idArt) {
        this.DataService.getArtist(this.idArt).subscribe(
          (data) => {
            this.artist = data;
            const contentDiv = document.getElementById('content');
            if (contentDiv) {
              contentDiv.innerHTML = this.artist.summary;
            }
          }
        )
      }
    });
  }

}
