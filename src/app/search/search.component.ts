import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service: SharedService) { }

  ticker_id:any = '';

  filterTerm: string = '';
  
  stocksRecords = [{

    },          
  ];

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

}
