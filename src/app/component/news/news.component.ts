import { Component } from '@angular/core';
import { DataService } from "src/app/servicies/back/data.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent {

  constructor(private DataService: DataService, private router: Router){}

  albums!: [{ 
    idAlb: string; 
    imageAlbUrl: string; 
    nameAlb: string; 
    artists: [any]; }];
  isLoading = false;

  // Metodo para navegar al componente Album
  navAlbum (idAlb:string){
    this.router.navigate(['/album/',idAlb]);
  }

  navArtist (idArt:string){
    this.router.navigate(['/artist/',idArt]);
  }

 // Función principal: pide datos al back sobre nuevos lanzamientos
  ngOnInit(): void{
    this.DataService.newReleases().subscribe(
      (data) => {
        data.forEach( (album: { idAlb: string; imageAlbUrl: string; nameAlb: string; artists: [any]; }) => {
          if (this.albums) {
            this.albums.push(album);
          }else{
            this.albums = [album];
          }
          
        });
        this.isLoading = true;
      },
      (error) => {
        console.error('Error al obtener nuevos albunes', error);
      }
    );

  }
}


