import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-comodities',
  templateUrl: './comodities.component.html',
  styleUrls: ['./comodities.component.css']
})
export class ComoditiesComponent implements OnInit {

  constructor(private service:SharedService) { }
  datos: any = [];
  cocoa: any = [];
  crudeOil: any = [];
  gold: any = [];
  naturalGas: any = [];
  silver: any = [];
  
  last: number = 0;
  ngOnInit(){
    this.comodity();
  }

  comodity():void{
    this.service.getComodities().subscribe((data: any) => {
      this.datos = JSON.parse(data);
      console.log("Comodities",this.datos);
      // const last = new Array(this.datos.CC);
      var tempCC = this.datos.CC;
      var tempCL = this.datos.CL;
      var tempGC = this.datos.GC;
      var tempNG = this.datos.NG;
      var tempSI = this.datos.SI;

      var result;
      var index = [];
      index = tempCC; 
      for(let i = 0; i < 22; i++){
        var result = index[i];
        // tempCL
        console.log(result);
        if(result > 0){
          this.cocoa.push(result);
          this.crudeOil.push(tempCL[i]);
          this.silver.push(tempSI[i]);
          this.naturalGas.push(tempNG[i]);
          this.gold.push(tempGC[i]);
        }
      }
      this.last = this.cocoa.length - 1;
      console.log('nani',this.cocoa);
      console.log('nani2',this.last);


      // Nomenclatura de request con todos los tickers
      // console.log(this.datos["('GC=F', 'Close')"])
      // ('GC=F', 'Close'): 1765
    });
    
  }

}
