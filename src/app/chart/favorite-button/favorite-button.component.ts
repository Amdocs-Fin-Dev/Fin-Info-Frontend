import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {

  constructor(private service: SharedService) { }

  ngOnInit(): void {
  }

  addFavorites(){
    let ticker = localStorage.getItem('ticker_id');
    let email = localStorage.getItem('email');
    const favorite = {email,ticker}
    
    this.service.addPortfolio(favorite).subscribe(res=>{
      console.log("Agregado a Favoritos ", favorite);
    });
    
  }

  remove(){

  }
}
