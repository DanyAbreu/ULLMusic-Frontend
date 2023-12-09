import { Component } from '@angular/core';
import authOptions from 'src/main';

import * as request from 'request'; // "Request" library


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

}

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/browse/new-releases',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, data) {
      //metodo para obtener los nombres de los primeros 20 albunes
      for (let i = 0; i < data.albums.items.length; i++) {
        console.log(data.albums.items[i].name);
      }
      
    });
  }
  else{
    console.log("Error de conección: " + response.statusCode)
  }
});
