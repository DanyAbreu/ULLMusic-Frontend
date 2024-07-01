import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from '../component/news/news.component';
import { LoginComponent } from '../component/auth/login/login.component';
import { RegisterComponent } from '../component/auth/register/register.component';
import { AlbumComponent } from '../component/album/album.component';
import { ArtistComponent } from '../component/artist/artist.component';
import { SearchComponent } from '../component/search/search.component';
import { UserComponent } from '../component/auth/user/user.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
  { path: 'inicio', component: NewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'album/:idAlb', component: AlbumComponent },
  { path: 'artist/:idArt', component: ArtistComponent },
  { path: 'search/:strSearch', component: SearchComponent },
  { path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }