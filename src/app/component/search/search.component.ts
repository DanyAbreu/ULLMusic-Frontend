import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "src/app/servicies/back/data.service";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  strSearch!: string;
  search!: any;

  constructor(private route: ActivatedRoute, private DataService: DataService, private router: Router){}

  navAlbum (idAlb:string){
    this.router.navigate(['/album/',idAlb]);
  }

  navArtist (idArt:string){
    this.router.navigate(['/artist/',idArt]);
  }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.strSearch = params['strSearch'];
      if (this.strSearch) {
        this.DataService.getSearch(this.strSearch).subscribe(
          (data) => {
            this.search = data;
            console.log(this.search.artists)
          }
        )
      }
    });
  }

}
