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

//------------------- Funcion principal ------------------------//

(async () => {
    // Obtener el token de acceso
    const token = await obtenerToken(clientId, clientSecret);

    // Obtener información del album
    const newInfo = await obtenerInfoAlbum(id,token);
})();