import { Component } from '@angular/core';
import axios from "axios";
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/servicies/back/data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {

  idAlb!: string;
  constructor(private route: ActivatedRoute, private DataService: DataService){}
  album!: {
    idAlb: string;
    artists: [{
    idArt: string;
    nameArt: string;
    }];
    nameAlb: string;
    imageAlbUrl: string;
    genresAlb: string;
    popularityAlb: number;
    releaseDate: Date;
    tracks: [{
      idTrack: string;
      nameTrack: string;
      previewUrl: string;
      duration: Number;
    }];
  };

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
}
