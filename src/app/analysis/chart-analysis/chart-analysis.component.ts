import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SharedService } from '../../shared.service';
declare var google: any;
declare var google1: any;
@Component({
  selector: 'app-chart-analysis',
  templateUrl: './chart-analysis.component.html',
  styleUrls: ['./chart-analysis.component.css']
})
export class ChartAnalysisComponent implements OnInit, AfterViewInit {
  @ViewChild('rsiChart') rsiChart!: ElementRef;

  drawChart = (list: any)=>{
    list = this.dataAnalisis;
    const data = new google.visualization.DataTable();
    let rsi = [];
    let fecha = [];
    let close = [];
    let high = [];
    let low = [];
    let open = [];
    let stOscillator = [];
    let adx = [];
    let AvgTrueRange = [];
    let dates:Array<Date> = [];

    data.addColumn('datetime', 'Date');
    data.addColumn('number', 'Close');
    data.addColumn('number', 'High');
    data.addColumn('number', 'Low');
    data.addColumn('number', 'Open');
    data.addColumn('number', 'Close');
    // data.addColumn('number', 'stOscillator');
    // data.addColumn('number', 'RSI');
    // data.addColumn('number', 'adx');
    // data.addColumn('number', 'AvgTrueRange');

    // for(var i = 0; i < this.dataAnalisis.length; i++){
    //   data.addRows([[this.dataAnalisis.Date[i], this.dataAnalisis.rsi[i]]]);
    // }
    var array:Array<string> = Object.values(this.dataAnalisis.Date);
     //Convertimos nuestro array de objectos con las fechas en epoch en enteros
     for (i = 0; i < array.length; i++) {
      //Convertir los datos del objeto en enteros (es tipo object no string)
      const intValor = parseInt(array[i]);
      //console.log("Prueba=", intValor);

      //pasamos las fechas con la funcion date para que los valores en enteros puedan ser Datetime
      var new_date = new Date(intValor);
      // console.log(new_date);

      //recoger todas las fechas formateadas a Datetime.
      dates.push(new_date);
    }
    //end for 
    const index = Object.keys(this.dataAnalisis.Date).length;
    console.log("Indices :3", index);
    rsi = this.dataAnalisis.rsi;
    fecha = this.dataAnalisis.Date;
    close = this.dataAnalisis.Close;
    high = this.dataAnalisis.High;
    low = this.dataAnalisis.Low;
    open = this.dataAnalisis.Open;
    stOscillator = this.dataAnalisis.stOscillator;
    adx = this.dataAnalisis.adx;
    AvgTrueRange = this.dataAnalisis.AvgTrueRange;
    // console.log("Date",this.dataAnalisis.Date);
    // console.log("RSI",this.dataAnalisis.rsi);
    for(var i = 0; i < index; i++){
      console.log("valores",rsi[i]);
      data.addRows([[dates[i], high[i],open[i],close[i],low[i],close[i]]]);
    }
    // rsi[i],stOscillator[i],adx[i],AvgTrueRange[i]
    const options = {
      hAxis: {
        // title: 'Date'
      
      },
      vAxis: {
        // title: 'Average'
        
      },
      // backgroundColor: '#eef2eb',
      chartArea: {'width': '90%', 'height': '80%'},
               'legend': {'position': 'bottom'},
      // legend: 'series',
      // width: 1000,
      // height: 900,
      enableInteractivity:true,
      // bar: { groupWidth: '60%' },
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
        risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
      },
      animation: {
        duration: 2000,
        easing: 'linear',
        startup: true
      },
      seriesType: 'candlesticks',
      series: {
        1: { type:'line',
              hAxis: {scaleType: 'mirrorLog' }},
        2: { type:'line'},
        3: { type:'line'},
      },
      explorer: { 
        //actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        maxZoomIn: 10,
        maxZoomOut: 7
        }
    };

    // const chart = new google.visualization.LineChart(this.rsiChart.nativeElement);
    const chart = new google.visualization.ComboChart(this.rsiChart.nativeElement);
    chart.draw(data, options);
  }

  //------------------------------------------------------------------------------------------
  @ViewChild('lineChart') lineChart!: ElementRef;
  draw2 = (list: any) =>{
    list = this.dataAnalisis;
    const data = new google.visualization.DataTable();
    let rsi = [];
    let fecha = [];
    let close = [];
    let stOscillator = [];
    let adx = [];
    let AvgTrueRange = [];
    let dates:Array<Date> = [];

    data.addColumn('datetime', 'Date');
    data.addColumn('number', 'RSI');
    data.addColumn('number', 'Stochasticall Oscillator');
    data.addColumn('number', 'ADX');
    data.addColumn('number', 'AvgTrueRange');
    var array:Array<string> = Object.values(this.dataAnalisis.Date);
     //Convertimos nuestro array de objectos con las fechas en epoch en enteros
     for (let i = 0; i < array.length; i++) {
      //Convertir los datos del objeto en enteros (es tipo object no string)
      const intValor = parseInt(array[i]);
      //console.log("Prueba=", intValor);

      //pasamos las fechas con la funcion date para que los valores en enteros puedan ser Datetime
      var new_date = new Date(intValor);
      // console.log(new_date);

      //recoger todas las fechas formateadas a Datetime.
      dates.push(new_date);
    }
    const index = Object.keys(this.dataAnalisis.Date).length;
    console.log("Indices :3", index);
    rsi = this.dataAnalisis.rsi;
    fecha = this.dataAnalisis.Date;
    close = this.dataAnalisis.Close;
    stOscillator = this.dataAnalisis.stOscillator;
    adx = this.dataAnalisis.adx;
    AvgTrueRange = this.dataAnalisis.AvgTrueRange;

    for(var i = 0; i < index; i++){
      console.log("valores",rsi[i]);
      data.addRows([[dates[i],close[i],rsi[i],
        AvgTrueRange[i],adx[i]]]);
    }

    const options = {
      hAxis: {
        // title: 'Tecnichal Indicators'

      },
      vAxis: {
        // title: 'Average'
        
      },
      chartArea: {'width': '90%', 'height': '80%'},
      // backgroundColor: '#eef2eb',
      'legend': {'position': 'bottom'},
      lineWidth: 2,
      animation: {
        duration: 1500,
        easing: 'linear',
        startup: true
      },
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
    const chart = new google.visualization.AreaChart(this.lineChart.nativeElement);
    chart.draw(data, options);
  }

  constructor(private service: SharedService) { }

  tickerid: any = localStorage.getItem('ticker_id');
  dataAnalisis: any = [];
  ngAfterViewInit(): void {
    console.log("ngAfterView");
  }
  ngOnInit(): void {
  this.getTecnichal();
  }

  getTecnichal(){
    this.service.getAnalisis(this.tickerid, "0").subscribe(data=>{
      this.dataAnalisis = data;
      this.dataAnalisis = JSON.parse(this.dataAnalisis);
      const indice = this.dataAnalisis["rsi"];
      console.log("Open",this.dataAnalisis.Open);
      // google.charts.load('current', {packages: ['corechart', 'line']});
      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(this.drawChart);

      google.charts.load('current', {packages: ['corechart', 'line']});
      google.charts.setOnLoadCallback(this.draw2);
    });
  }
}
