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

  constructor(private route: ActivatedRoute, private router: Router, private DataService: DataService){}

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
            console.log(contentDiv);
            if (contentDiv) {
              contentDiv.innerHTML = this.artist.content;
            }
          }
        )
      }
    });
  }

}
