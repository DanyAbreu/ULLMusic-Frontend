import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { NewsComponent } from './component/news/news.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { AppRoutingModule } from './route/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlbumComponent } from './component/album/album.component';
import { ArtistComponent } from './component/artist/artist.component';
import { SearchComponent } from './component/search/search.component';
import { UserComponent } from './component/auth/user/user.component';
import { WaitComponent } from './component/shared/wait/wait.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NewsComponent,
    LoginComponent,
    RegisterComponent,
    AlbumComponent,
    ArtistComponent,
    SearchComponent,
    UserComponent,
    WaitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
