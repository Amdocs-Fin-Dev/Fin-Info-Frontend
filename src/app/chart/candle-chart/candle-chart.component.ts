import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SharedService } from '../../shared.service';
import { ChartType,GoogleChartsModule } from 'angular-google-charts';

declare var google: any;

@Component({
  selector: 'app-candle-chart',
  templateUrl: './candle-chart.component.html',
  styleUrls: ['./candle-chart.component.css']
})
export class CandleChartComponent implements OnInit, AfterViewInit {
  @ViewChild('candleChart') candleChart!: ElementRef;

  drawChart = (list:any) => {
    list = this.ChartList;
    const data = new google.visualization.DataTable();

    let keys = []; //key values
    let values_high = [];
    let values_low = [];
    let values_close = [];
    let values_open = [];
    let index = []; //index of values 0 to lenght-1
    let fechas:Array<Date> = []; //aqui almacenamos nuestras fechas de epoch a datetime

    //Almacenamos nuestros key values que en este caso son las fechas en formato epoch unix
    for (var k in list['High']) {
      keys.push(k);
    }

      //console.log("Muestra algo",keys)
      //en values almacenamos los valores de nuestro json teniendo como key la fecha en epoch unix
      for (var i = 0; i < keys.length; i++) {
        //console.log(list['High'][keys[i]]);
        values_high.push(list['High'][keys[i]]);
        values_low.push(list['Low'][keys[i]]);
        values_open.push(list['Open'][keys[i]]);
        values_close.push(list['Close'][keys[i]]);
      }

    //almacenamos nuestras keys en un array que sigue siendo un objecto pero asi ya podemos manipular los datos
      var array:Array<string> = Object.values(keys);
      // console.log("Tipo de mi array: ", typeof (array));
      // console.log("Values:", array);

      //Convertimos nuestro array de objectos con las fechas en epoch en enteros
      for (i = 0; i < array.length; i++) {
        //Convertir los datos del objeto en enteros (es tipo object no string)
        const intValor = parseInt(array[i]);
        //console.log("Prueba=", intValor);

        //Pasamos las fechas con la funcion date para que los valores en enteros puedan ser Datetime
        var new_date = new Date(intValor);
        // console.log(new_date);

        //recoger todas las fechas formateadas a Datetime.
        fechas.push(new_date);
      }
      //end for 

      // console.log("Nuevas Fechas: ", fechas);

      //Creamos los indices del cero hasta la longitud de los valores
      for (var z = 0; z < values_high.length; z++) {
        index.push(z);
      }
      data.addColumn('datetime', 'Date');
      data.addColumn('number', 'High');
      data.addColumn('number', 'Open');
      data.addColumn('number', 'Close');
      data.addColumn('number', 'Low');

      for (var i = 0; i < fechas.length; i++) {
        data.addRows([[fechas[i], values_high[i], values_open[i], values_close[i], values_low[i]]]);
        }

        const options = {
          legend: 'series',
          selectionMode: 'multiple',
          tooltip: {trigger: 'selection'},
          aggregationTarget: 'category',
          candlestick: {
              fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
              risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
            },
            chartArea: {'width': '90%', 'height': '80%'},
            explorer: { 
              //actions: ['dragToZoom', 'rightClickToReset'],
              axis: 'horizontal',
              maxZoomIn: 10,
              maxZoomOut: 7
              }
        };
        const chart = new google.visualization.CandlestickChart(this.candleChart.nativeElement);
        chart.draw(data, options);

  }
 


  constructor(private service:SharedService) { }
  title = localStorage.getItem('ticker_id');
  ChartList: any = [];
  myVarible: any = [];
  id: any = localStorage.getItem('ticker_id');
  interval: string = "1d"
  period:string = "1y";
  period2:string = "1d";
  intervaltimer: any
  contador = 1;
  lastVolume: number = 0;
  lastClose: number = 0;
  almostLastClose: number = 0;
  differenceClose: number = 0;

  ngOnInit(): void {
    this.refreshChartList('2m');
    this.intervaltimer = setInterval(() => {
  
    this.refreshChartList('2m');

    this.contador++

    console.log(this.contador + "50000 holi")

}, 20000);
  }

  refreshChartList(interval:string){
    //antes this.id como parametro
    if(interval == '2m'){
      this.service.getDepListTest(this.id,interval, this.period2).subscribe(data=>{
        this.ChartList = data;
        this.ChartList = JSON.parse(this.ChartList);
        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(this.drawChart);
      });
    }else{
      this.service.getDepListTest(this.id,interval, this.period).subscribe(data=>{
        this.ChartList = data;
        this.ChartList = JSON.parse(this.ChartList);
        const nani = Object.keys(this.ChartList.Volume);
        console.log("Mis llavesitas",nani);
        this.lastVolume = this.ChartList.Volume[Object.keys(this.ChartList.Volume)[Object.keys(this.ChartList.Volume).length - 1]];
        this.lastClose = this.ChartList.Close[Object.keys(this.ChartList.Close)[Object.keys(this.ChartList.Close).length - 1]];
        this.almostLastClose = this.ChartList.Close[Object.keys(this.ChartList.Close)[Object.keys(this.ChartList.Close).length - 2]];
        this.differenceClose = this.lastClose - this.almostLastClose;
        if(this.lastClose > this.almostLastClose){
          document.getElementById("diff")!.style.color = '#00ff00';
        }
        else{
          document.getElementById("diff")!.style.color = '#dc3545';
        }
        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(this.drawChart);
      });
    }

    //esto se pondria en la funcion de buscar a la hora de que se agarre el id
    // this.saveLocalStorage();
  }

  saveLocalStorage(){
    localStorage.setItem("ticker_id", this.id);
  }

     ngAfterViewInit(): void {
      // google.charts.load('current', {packages: ['corechart']});
      // google.charts.setOnLoadCallback(this.drawChart);
    } 



}

