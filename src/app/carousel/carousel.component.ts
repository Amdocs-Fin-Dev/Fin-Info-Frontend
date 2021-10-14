import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private service:SharedService) { }
  
  noticias : any = [];
  images: any = [];
  test: string = '';

  ngOnInit(): void {
    this.news();
  }
  news(){
    this.service.getTopNews().subscribe((data:any)=>{
      this.noticias = data;

      for(var i = 0; i < this.noticias.length; i++){
        console.log(this.noticias[i].urlToImage);
        this.images.push(this.noticias[i].urlToImage);
      }
      this.test = this.images[2];
      console.log("Imagenn",this.test);
    });
  }
}
