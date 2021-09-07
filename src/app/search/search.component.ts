import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service: SharedService) { }

  ticker_id:string = '';

  filterTerm: string = '';
  
  // stocksRecords = [{

  //   },          
  // ];

  stocksRecords:any = [];

  ngOnInit(): void {
  }

  applyFilter(){
    if(this.filterTerm == ''){
      return
    } 
    this.service.getSearchList(this.filterTerm).subscribe(data =>{
      console.log(data);
      this.stocksRecords = data;
      console.log(data);
    });
  }

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  buscar():void{
    const valor = this.txtBuscar.nativeElement.value;
    localStorage.setItem("ticker_id", valor);
    console.log("Valor de la busqueda: ",valor);
    if (valor.trim().length === 0 ){
      return;
    }else{
      
    }
    window.location.reload();
    this.txtBuscar.nativeElement.value= '';
  }

  save(ticker: any){
    console.log("Ticker buscado:", ticker);
    console.log("Ticker buscado:", typeof(ticker));
    this.ticker_id = ticker.toString();
    localStorage.setItem("ticker_id", this.ticker_id);
    console.log(this.ticker_id);
    console.log(typeof(this.ticker_id));
    this.txtBuscar.nativeElement.value= this.ticker_id;
    window.location.reload();
    this.txtBuscar.nativeElement.value= '';
  }
  //metodo para seleccionar el tickerid y eso mandarlo al local storage y que se haga el refresh

}
