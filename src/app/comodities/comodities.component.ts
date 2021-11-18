import { isNull } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { isEmptyObject } from 'jquery';
import { SharedService } from '../shared.service';

declare var google: any;

@Component({
  selector: 'app-comodities',
  templateUrl: './comodities.component.html',
  styleUrls: ['./comodities.component.css']
})
export class ComoditiesComponent implements OnInit, AfterViewInit {

  constructor(private service:SharedService) { }
  private greenIndex: number = -1;
  private redIndex: number = 1;
  
  @ViewChild('comodityChart') comodityChart!: ElementRef;
  drawChart = (list: any, nameL:string)=>{
    this.datosChart = list;
    if(isEmptyObject(list)){
      this.datosChart = this.gold;
    }
    console.log("Mis datos son: ", list);
    const data = new google.visualization.DataTable();
    let dates: Array<Date> = [];
    let cocoa = [];
    let name: string = nameL;

    data.addColumn('datetime', 'Date');
    data.addColumn('number', name);

    var array: Array<string> = Object.values(this.datos.Date);

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
    const index = Object.keys(this.datosChart).length;
    const index2 = dates.length;
    console.log("INDEX",index);
    // console.log("Indices :3", index);
    // console.log("Indices valores", Object.keys(this.datos.Date));
    cocoa = this.datosChart;
    // console.log(cocoa);
    console.log("Fechas",dates);
    console.log("Valores",cocoa);
    for(var i = 0; i < index2; i++){
      // console.log("valoressss", cocoa[i]);
      if(cocoa[i] == null){
        cocoa[i] = cocoa[i-1];
      }
      if(cocoa[i] > 0){
        data.addRows([[dates[i],cocoa[i]]]);
      }
    }

    const options = {
      legend: 'series',
      hAxis: {
        // title: 'Date'

      },
      vAxis: {
        // title: 'Average'
      },
      chartArea: {'left':'0','top':'20','width': '100%', 'height': '100%'},
      // backgro    undColor: '#eef2eb',

      series: {
        0: { color: '#3fcfd4' }
      },
      explorer: { 
        //actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        maxZoomIn: 10,
        maxZoomOut: 7
        }
    };

    const chart = new google.visualization.AreaChart(this.comodityChart.nativeElement);
    chart.draw(data,options);

  }
  datosChart: any = [];
  datos: any = [];
  cocoa: any = [];
  crudeOil: any = [];
  gold: any = [];
  naturalGas: any = [];
  silver: any = []; 
  last: number = 0;
  ngOnInit(){
    this.comodity();
    // this.colores();
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
        // console.log(result);
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

      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(this.drawChart);
    });

    // ----------------------------------------------------------
    
  }

  test(){
    console.log("mouse over is working :33");
  }
  @ViewChild('dataCell') dataCell!: ElementRef;
  colores(){

    // const valor = document.getElementById('dataCell')!.innerText.value;
    var tr = document.getElementsByTagName("tr")[1];
    var td = tr.getElementsByTagName("td")[3];
    var td_text = td.innerHTML;
    console.log("Celda", td_text);
    document.getElementById('dataCell')!.style.color ="#dc3545";
    // var col = this.dataCell.nativeElement;
    // this.dataCell.nativeElement.innerHTML.style.color= "#dc3545";
    // var col= document.getElementById("demo").innerHTML;
    // col.style.color="#dc3545";

  }

  ngAfterViewInit(): void {
    // this.colores();
    // // console.log(this.dataCell);
    // var tr = document.getElementsByTagName("tr")[1];
    // var td = tr.getElementsByTagName("td")[3];
    // var td_text = td.innerHTML;
    // console.log("Celda", td_text);
    document.getElementById('dataCell')!.style.color ="#dc3545";
    // this.dataCell.nativeElement.style.color = "#dc3545";
    console.log("NgAfterViewInit");
  }
}
