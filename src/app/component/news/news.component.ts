import { Component } from '@angular/core';
import { DataService } from "src/app/servicies/back/data.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  constructor(private DataService: DataService){}

 
  ngOnInit(): void{
    this.DataService.newReleases().subscribe(
      (data) => {
        data.forEach( (album: { idAlb: string; imageAlbUrl: string; nameAlb: string; artists: any; }) => {
          let artistStr = "";
          album.artists.forEach( (artist: { nameArt: String;}) => {
            console.log(artist)
            artistStr += artist.nameArt + ". "
          });
          (<HTMLInputElement>document.getElementById("news")).innerHTML += `
          <div class="col">
            <a href="/album">
              <div id="${album.idAlb}" class="card bg-dark text-white" style="width: 18rem; margin: 5px;">
                <img src="${album.imageAlbUrl}" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${album.nameAlb}</h5>
                  <p>Artistas: ${artistStr}</p>
                </div>
              </div>
            </a>
          </div>
          `
        });
        
      },
      (error) => {
        console.error('Error al obtener nuevos albunes', error);
      }
    );

  }
}


