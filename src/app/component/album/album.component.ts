import { Component } from '@angular/core';
import { LoadScriptsService } from 'src/app/servicies/load-scripts.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {
  constructor( private _loadScripts:LoadScriptsService ){
    /* console.log("SE INICIA EL CONSTRUCTOR") */
    _loadScripts.load(["album"]);
  }

}
