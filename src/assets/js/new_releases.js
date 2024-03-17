/* console.log("Inicio script") */

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

// Credenciales de la aplicación en el panel de desarrolladores de Spotify
const clientId = '741295b943af455da7854611514d1fe9';
const clientSecret = 'b843b31896e14b07818bf1895f28c08d';

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
// copiar para el complemento album
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

//----------------------------------------------------------------//

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
/* console.log("Fuera de async"); */

(async () => {  
  /* console.log("Dentro de async"); */
  try {
    // Obtener el token de acceso
    const token = await obtenerToken(clientId, clientSecret);

    // Obtener información sobre ultimas novedades
    const newInfo = await obtenerNewReleases(token);

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
      document.getElementById("news").innerHTML += `
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
  } catch (error) {
    console.error('Error:', error.message);
  }
})();

/* const hello = () => {
  console.log("hello world")
} */