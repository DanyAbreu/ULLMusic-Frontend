import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadScriptsService {

  constructor() { }

  load( scripts: string[] ){
    /* console.log(`SE INICIA EL SERVICIO CON ${scripts}`) */
    for ( let script of scripts) {
      let scriptElement = document.createElement("script");
      scriptElement.type="module";
      scriptElement.src = "./../../assets/js/" + script + ".js";
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(scriptElement);
      /* console.log(`SE INTRODUCE EL ELEMENTO ${scriptElement.src}`) */
    }
  }

}
