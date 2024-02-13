// /**
//  * This is an example of a basic node.js script that performs
//  * the Client Credentials oAuth2 flow to authenticate against
//  * the Spotify Accounts.
//  *
//  * For more information, read
//  * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
//  */
// import request from 'request';
// var client_id = '741295b943af455da7854611514d1fe9'; // Your client id
// var client_secret = 'b843b31896e14b07818bf1895f28c08d'; // Your secret

// // your application requests authorization
// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     // 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//     'Authorization': 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {

//     // use the access token to access the Spotify Web API
//     var token = body.access_token;
//     var options = {
//       url: 'https://api.spotify.com/v1/browse/new-releases',
//       headers: {
//         'Authorization': 'Bearer ' + token
//       },
//       json: true
//     };
//     request.get(options, function(error, response, data) {
//       //metodo para obtener los nombres de los primeros 20 albunes
//       for (let i = 0; i < data.albums.items.length; i++) {
//         console.log(data.albums.items[i].name);
//       }
      
//     });
//   }
//   else{
//     console.log("Error de conección: " + response.statusCode)
//   }
// });


// import axios from "./../../node_modules/axios/index";
// import axios from "../../node_modules/axios/index";

const loadScript = function(url){
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
   
  });
}



//Obtener axios
await loadScript("https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js");



//----------------------------------------------------------------//

const obtenerToken = async (clientId, clientSecret) => {
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
  } catch (error) {
    console.error('Error al obtener el token:', error.message);
    throw error;
  }
};

//----------------------------------------------------------------//

const obtenerInfoAlbum = async (albumId, token) => {
  // Endpoint de Spotify para obtener información de un álbum
  const albumUrl = `https://api.spotify.com/v1/albums/${albumId}`;

  try {
    // Haciendo la solicitud para obtener información del álbum
    const albumResponse = await axios.get(albumUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Devolver la información del álbum
    return albumResponse.data;
  } catch (error) {
    console.error('Error al obtener la información del álbum:', error.message);
    throw error;
  }
};

const obtenerNewReleases = async (token) => {
  const newUrl = 'https://api.spotify.com/v1/browse/new-releases'
  try {
    const newResponse = await axios.get (newUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return newResponse.data;
  } catch (error) {
    console.error('Error al obtener los nuevos lanzamientos:', error.message);
    throw error
  }
};

//------------------- Funcion principal ------------------------//


// Credenciales de la aplicación en el panel de desarrolladores de Spotify
const clientId = '741295b943af455da7854611514d1fe9';
const clientSecret = 'b843b31896e14b07818bf1895f28c08d';

// ID de un álbum específico
const albumId = '5I4I0k75uiUnqyJvh7vxLC';



(async () => {
  try {


   // Obtener el token de acceso
    const token = await obtenerToken(clientId, clientSecret);

    // Obtener información del álbum
    const newInfo = await obtenerNewReleases(token);

    // Mostrar la información del álbum
    for (let i = 0; i < newInfo.albums.items.length; i++) {
      //console.log(newInfo.albums.items[i].name);
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
      console.log(artists)
      document.getElementById("news").innerHTML += `
      <div class="col">
        <div class="card bg-dark text-white" style="width: 18rem; margin: 5px;">
          <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p>Artistas: ${str_artists}</p>
              <p>${type}</p>
            </div>
          </div>
      </div>
      `
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
})();

/* const hello = () => {
  console.log("hello world")
} */