import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadScriptsService {

  constructor() { }

  load( scripts: string[] ){
    for ( let script of scripts) {
      let scriptElement = document.createElement("script");
      scriptElement.type="module";
      scriptElement.src = "./../../assets/" + script + ".js";
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(scriptElement);
    }
  }

}
