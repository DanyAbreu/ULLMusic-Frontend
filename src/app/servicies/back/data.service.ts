import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  getAlbum(idAlb:string): Observable<any> {
    return this.http.get<any>(environment.BACK_URL+"album/"+idAlb);
  }

  getArtist(idArt:string): Observable<any> {
    return this.http.get<any>(environment.BACK_URL+"artist/"+idArt);
  }

  getSearch(strSearch:string): Observable<any> {
    return this.http.get<any>(environment.BACK_URL+"search/"+strSearch);
  }
}
