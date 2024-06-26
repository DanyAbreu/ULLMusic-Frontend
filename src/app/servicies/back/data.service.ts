import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  newReleases(): Observable<any> {
    return this.http.get<any>(environment.BACK_URL+"news");
  }

  getAlbum(idAlb:string, idUser: any): Observable<any> {
    const params = new HttpParams()
      .set('idAlb', idAlb)
      .set('idUser', idUser);
    return this.http.get<any>(environment.BACK_URL+"album", { params });
  }

  getArtist(idArt: string, idUser: any): Observable<any> {
    const params = new HttpParams()
      .set('idArt', idArt)
      .set('idUser', idUser);
    return this.http.get<any>(`${environment.BACK_URL}artist`, { params });
  }
  
  userLikesArtist(idArt:string, idUser:any): Observable<any> {
    const params = new HttpParams()
      .set('idArt', idArt)
      .set('idUser', idUser);
      return this.http.get<any>(`${environment.BACK_URL}userLikesArtist`, { params });
  }

  userLikesAlbum(idAlb:string, idUser:any): Observable<any> {
    const params = new HttpParams()
      .set('idAlb', idAlb)
      .set('idUser', idUser);
      return this.http.get<any>(`${environment.BACK_URL}userLikesAlbum`, { params });
  }

  userLikesTrack(idTrack:string, idUser:any): Observable<any> {
    const params = new HttpParams()
      .set('idTrack', idTrack)
      .set('idUser', idUser);
      return this.http.get<any>(`${environment.BACK_URL}userLikesTrack`, { params });
  }

getSearch(strSearch:string): Observable<any> {
    return this.http.get<any>(environment.BACK_URL+"search/"+strSearch);
  }
}
