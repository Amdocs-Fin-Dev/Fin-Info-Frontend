import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
// import { OwlModule } from 'ngx-owl-carousel';
declare var $: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private service:SharedService, private _config: NgbCarouselConfig) { 
    _config.interval= 5000;
    _config.wrap = true;
    _config.pauseOnHover = true;
    _config.showNavigationIndicators = false;
    _config.showNavigationArrows = true;
    // _config.animation= true;
  }

  // constructor(private service:SharedService){}

  homeSlider= {items:2, dots: true, nav: true}

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  
  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  
  noticias : any = [];
  images: any = [];
  test: string = ''; 
  

  ngOnInit(): void {
    this.news();
    $('.owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
              nav:true
          },
          600:{
              items:3,
              nav:false
          },
          1000:{
              items:5,
              nav:true,
              loop:false
          }
      }
    })
  }
  activeSlides: SlidesOutputData | undefined;

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }
  news(){
    this.service.getTopNews().subscribe((data:any)=>{
      this.noticias = data;
      console.log(this.noticias)
      for(var i = 0; i < this.noticias.length; i++){
        // console.log(this.noticias[i].urlToImage);
        this.images.push(this.noticias[i].urlToImage);
        // console.log(typeof(this.noticias[i].urlToImage));
      }
      // this.test = this.images[2];
      console.log("Imagenn",this.test);
    });
  }


}
