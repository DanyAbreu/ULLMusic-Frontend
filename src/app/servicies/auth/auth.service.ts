import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { BehaviorSubject, Observable, catchError, throwError, tap, map } from 'rxjs';
import { UserResponse } from './userInterface';
import { environment } from 'src/environment/environment';
import { RegisterRequest } from './registerRequest';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  currentUserData: BehaviorSubject<UserResponse> = new BehaviorSubject<UserResponse>({message:'',id:0,username:'',token:''})
  
  constructor(private http: HttpClient) { }

  get userData():Observable<UserResponse>{
    return this.currentUserData.asObservable()
  }
  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable()
  }

  //metodo para comunicarse con el backend
  login(credentials:LoginRequest):Observable<UserResponse>{
    return this.http.post<UserResponse>(environment.BACK_URL+'auth/login',credentials).pipe(
      tap( (userData: UserResponse) => {
        this.currentUserData.next(userData)
        this.currentUserLoginOn.next(true)
      }),
      // map((user: UserResponse) =>{
      //   this.
      // }),
      catchError(this.handleError)
    )
  }

  register(credentials:RegisterRequest):Observable<UserResponse>{
    return this.http.post<UserResponse>(environment.BACK_URL+'auth/register',credentials).pipe(
      tap( (userData: UserResponse) => {
        this.currentUserData.next(userData)
        this.currentUserLoginOn.next(true)
      }),
      // map((user: UserResponse) =>{
      //   this.
      // }),
      catchError(this.handleError)
    )
  }

  private checkToken(): void{}

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error.', error.error)
    }
    else{
      console.error('Backend retornó el codigo de estado ', error.status, error.error)
    }
    return throwError(()=> new Error('Hay un error, por favor intentelo nuevamente.'))
  }

}
