import { Component } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  constructor(){}

  // Credenciales de la aplicación en el panel de desarrolladores de Spotify
  private clientId = '741295b943af455da7854611514d1fe9';
  private clientSecret = 'b843b31896e14b07818bf1895f28c08d';

  //--------------------------------------------------------------------------//
  private obtenerToken = async (clientId:string, clientSecret:string) => {
    // Endpoint de Spotify para obtener token de acceso
    const tokenUrl = 'https://accounts.spotify.com/api/token';
  
    // Datos de autenticación
    const authData = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    };
  
    try {
      // Haciendo la solicitud para obtener el token
      const tokenResponse = await axios.post(tokenUrl, new URLSearchParams(authData), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
     
      // Devolver el token de acceso
      return tokenResponse.data.access_token;
    } catch (error:any) {
      console.error('Error al obtener el token:', error.message);
      throw error;
    }
  };
  //--------------------------------------------------------------------------//
  private obtenerNewReleases = async (token:string) => {
    const newUrl = 'https://api.spotify.com/v1/browse/new-releases'
    try {
      const newResponse = await axios.get (newUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return newResponse.data;
    } catch (error:any) {
      console.error('Error al obtener los nuevos lanzamientos:', error.message);
      throw error
    }
  };
  //--------------------------------------------------------------------------//
  ngOnInit(): void{
    //this._loadScripts.load(["new_releases"]);
    (async () => {  
      /* console.log("Dentro de async"); */
      try {
        // Obtener el token de acceso
        const token = await this.obtenerToken(this.clientId, this.clientSecret);
    
        // Obtener información sobre ultimas novedades
        const newInfo = await this.obtenerNewReleases(token);
    
        // Mostrar la información del álbum
        for (let i = 0; i < newInfo.albums.items.length; i++) {
          let id = newInfo.albums.items[i].id;
          let image = newInfo.albums.items[i].images[0].url;
          let name = newInfo.albums.items[i].name;
          let type = newInfo.albums.items[i].album_type;
          let artists = newInfo.albums.items[i].artists;
          let str_artists = "";
          for (let j = 0; j < artists.length; j++){
            if ( j!=0 ){
              str_artists += ', '
            }
            str_artists += artists[j].name;
          }
          /* onclick="myFunction()" */
          (<HTMLInputElement>document.getElementById("news")).innerHTML += `
          <div class="col">
            <a href="/album">
              <div id="${id}" class="card bg-dark text-white" style="width: 18rem; margin: 5px;">
                <img src="${image}" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                  <p>Artistas: ${str_artists}</p>
                  <p>${type}</p>
                </div>
              </div>
            </a>
          </div>
          `
        }
      } catch (error:any) {
        console.error('Error:', error.message);
      }
    })();

  }
}


