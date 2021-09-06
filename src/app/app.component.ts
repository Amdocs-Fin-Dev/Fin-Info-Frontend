import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'angular-google-charts';
// For MDB Angular Free
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'Angular 12';
 //agregue manualmente el constructor y el ngOnInit no se porque

 //para manana poner en el buscar los servicios para hacer la busqueda
  //en el line chart, candle chart y en technical analysis
  constructor(private shared: SharedService){}

  title = '';
  type:any = 'CandlestickChart';
  data = [
     [1625011200000, 20, 28, 38, 45],
     [1625097600000, 31, 38, 55, 66],
     [1625529600000, 50, 55, 77, 80],
     [1626825600000, 77, 77, 66, 50],
     [1627516800000, 68, 66, 22, 15]
  ];
  columns = ['Date', 'A','B','C','D'];
  options = {
     legend:'series', 
     selectionMode: 'multiple',
     tooltip: {trigger: 'selection'},
     aggregationTarget: 'category',
     candlestick: {
        fallingColor: { strokeWidth: 2, fill:'#a52714' }, // red
        risingColor: { strokeWidth: 2, fill: '#0f9d58' }   // green
     },
     explorer: {
      // actions: ['dragToZoom', 'rightClickToReset'],
      axis: 'horizontal',
      maxZoomIn: 10,
      maxZoomOut: 7
     }

  };
  
  width = 1000;
  height = 400;

  // ngOnInit(): void {
  // }

  cambiarNombre(){
    alert("Porfavor funciona :3");
    console.log("Si funcionaste :3");
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




// options = {
//   legend: 'series',
//   selectionMode: 'multiple',
//   tooltip: {trigger: 'selection'},
//   aggregationTarget: 'category',
//   candlestick: {
//       fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
//       risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
//     },
//     explorer: { 
//       //actions: ['dragToZoom', 'rightClickToReset'],
//       axis: 'horizontal',
//       maxZoomIn: 10,
//       maxZoomOut: 7
//       }
// }