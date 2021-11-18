import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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

  cards = [
    {
      title: 'Card Title 1',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 2',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 3',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 4',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 5',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 6',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 7',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 8',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 9',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
  ];
  slides: any = [[]];


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
  Raww : any = [];
  noticias : any = [];
  images: any = [];
  test: string = ''; 
  
  ngOnInit(): void {
    this.news();
    // this.slide2();
  }
  activeSlides: SlidesOutputData | undefined;

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }
  news(){
    let R:any = [];
    this.service.getTopNews().subscribe((data:any)=>{
      this.noticias = data;
      console.log("Tipo de OBJECTO",this.noticias);
      console.log("Tipo de OBJECTO2",this.cards);
      // for(var i = 0; i < this.noticias.length; i++){
      //   console.log(this.noticias[i].urlToImage);
      //   this.images.push(this.noticias[i].urlToImage);
      //   console.log(typeof(this.noticias[i].urlToImage));
      // }
      // this.test = this.images[2];
      // console.log("Imagenn",this.test);
      for (let i = 0, len = this.noticias.length; i < len; i += 4) {
        R.push(this.noticias.slice(i, i + 4));
        // console.log("LALALA",this.Raww);
      }
      this.slides = R;
      console.log("Quiero dormir",this.slides);
    });
    console.log("Ya paso el metodo");
    // this.chunk(this.noticias,4);
  }

  chunk(arr: any, chunkSize: any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
      // console.log("LALALA",this.Raww);
    }
    // console.log("Esta es la r",this.Raww);
    // this.slides = R;
    return R;
  }

  // slide2(){
  //   console.log("nani????",this.noticias);
  //   this.slides = this.chunk(this.noticias, 4);
  // }


}
