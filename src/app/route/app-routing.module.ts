import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from '../component/news/news.component';
import { LoginComponent } from '../component/auth/login/login.component';
import { RegisterComponent } from '../component/auth/register/register.component';
import { AlbumComponent } from '../component/album/album.component';
import { ArtistComponent } from '../component/artist/artist.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
  { path: 'inicio', component: NewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'album/:idAlb', component: AlbumComponent },
  { path: 'artist/:idArt', component: ArtistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }