import { Component } from '@angular/core';
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
            console.log(this.album.artists);
            console.log(this.album.tracks);
          }
        );
      }
    });
  }
}
