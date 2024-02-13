import { Component } from '@angular/core';
import { LoadScriptsService } from 'src/app/servicies/load-scripts.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  constructor( private _loadScripts:LoadScriptsService ){
    _loadScripts.load(["prueba"]);
  }
}


