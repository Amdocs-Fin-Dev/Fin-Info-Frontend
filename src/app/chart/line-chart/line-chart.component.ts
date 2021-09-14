import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { interval } from 'rxjs';
import { SharedService } from '../../shared.service';
declare var google: any;
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart') lineChart!: ElementRef;
  drawChart = (list: any) => {
    list = this.ChartList;
    const data = new google.visualization.DataTable();

    let keys = []; //key values
    let values_high = []; //high
    let values_low = [];
    let values_close = [];
    let values_open = [];
    let index = []; //index of values 0 to lenght-1
    //var date = [];

    let fechas:Array<Date> = []; //aqui almacenamos nuestras fechas de epoch a datetime

    //almacenamos nuestros key values que en este caso son las fechas en formato epoch unix
    for (var k in list['High']) {
      keys.push(k);
    }

    // console.log("Muestra algo",keys)
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

        //pasamos las fechas con la funcion date para que los valores en enteros puedan ser Datetime
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
      data.addColumn('number', 'Close');

      //metemos los datos a la grafica
       for (var i = 0; i < index.length; i++) {
        data.addRows([[fechas[i], values_close[i]]]);
      }     

    const options = {
      hAxis: {
        // title: 'Date'

      },
      vAxis: {
        // title: 'Average'
      },
      chartArea: {'width': '90%', 'height': '80%'},
      // backgroundColor: '#eef2eb',

      series: {
        // 0: { color: '#3fcfd4' }
      },
      explorer: { 
        //actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        maxZoomIn: 10,
        maxZoomOut: 7
        }
    };

    const chart = new google.visualization.LineChart(this.lineChart.nativeElement);
    chart.draw(data, options);
  }

  constructor(private service:SharedService) { }
  title = localStorage.getItem('ticker_id');
  id:  any = localStorage.getItem('ticker_id');
  period:string = "1y";

  ngAfterViewInit(): void {
    console.log("ngAfterView");
  }

  ChartList: any = [];

  ngOnInit(): void {
  this.refreshChartList('1d');

  }

  refreshChartList(interval:string){
    //antes con this.id como parametro
    this.service.getDepListTest(this.id, interval, this.period).subscribe(data=>{
      this.ChartList = data;
      this.ChartList = JSON.parse(this.ChartList);
      google.charts.load('current', {packages: ['corechart', 'line']});
      google.charts.setOnLoadCallback(this.drawChart);
    }); 
  }
/*   ngAfterViewInit(): void {
    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(this.drawChart);
  } */
}
