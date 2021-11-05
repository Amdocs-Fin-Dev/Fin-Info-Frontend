import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Ticker } from '../interface/ticker.interface';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { isEmptyObject } from 'jquery';

declare var google: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userDetails:any;
  closeResult = '';
  constructor(private router: Router, private service:SharedService, private modalService: NgbModal) {
  }

  // this variables maybe will be in another component
  tempInvest:any = 0;
  // Ticker donde se esta haciendo la inversion
  investTicker:string = '';
  dateInvest:any = '';
  dataMeruko: any = [];
  datosChart: any = [];

  UserList: any = [];
  UserPortfolio: any = []; 
  Portfolio: any = [];
  ActualEmail: string = '';
  period: string = "1d";
  interval: string = "1d";
  ChartList: any = [];
  Keys: any = [];
  Lista: any = [];

  tick: Ticker[] = [];
  current_ticker : string = '';
  values_ticker : Array<any> = [];
  values_high : Array<any> = [];
  values_low : Array<any> = [];
  values_close: Array<any> = [];
  values_open : Array<any> = [];
  objeto_window_referencia: any;
  configuracion_ventana = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
  ngOnInit(): void {
    // this.getPorfolio();
    //creamos de Key para los valores de autenticacion
    const storage = localStorage.getItem('google_auth');
    this.getUser();

    if (storage) {
      //convertimos la data
      this.userDetails = JSON.parse(storage);
      localStorage.setItem('email', this.userDetails.email);
    } else {
      this.signOut();
    }

    this.addUser();

    this.getPorfolio();
    // this.getPortfolioData();
    // a ver como jala
    this.getInvestList()
  }

  signOut(): void {
    //removemos el usuario removiendo del local storage la data
    localStorage.removeItem('google_auth');
    localStorage.removeItem('email');
    this.router.navigateByUrl('/candle').then();
  }

  //I dont use it 
  getUser():void{
    this.service.getUserList().subscribe(data=>{
      this.UserList = data;
      // console.log(this.UserList);
    });
  }

  addUser():void{
    const username = this.userDetails.username;
    const firstName = this.userDetails.firstName;
    const lastName = this.userDetails.lastName;
    var email = this.userDetails.email;
    const idToken = this.userDetails.idToken;
    var result = {username, firstName, lastName, email, idToken}

    this.service.addUser(result).subscribe(res=>{
      console.log("Session stored in database.");

    });
    let newEmail:string = email;

    this.ActualEmail = email;

    this.service.getPorfolio(newEmail).subscribe(res=>{
       this.UserPortfolio = res;
       console.log("Portfolio:",this.UserPortfolio);
     });
  }
  
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  buscar():void{
    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);
    if (valor.trim().length === 0 ){
      return;
    }
    this.txtBuscar.nativeElement.value= '';
    this.addPortfolio(this.ActualEmail, valor);
    this.current_ticker = valor;
    window.location.reload();
    //here
    //COMMENTED HERE! IF SOMETHING DOESN'T WORK, UNCOMENT
    // this.getPortfolioData(valor);
  }

  addPortfolio( email:string, ticker:string ):void{
    var email = email;
    var ticker = ticker;

    const resultado = {email,ticker};
    //meto la nueva entrada del portfolio a la base de datos
    this.service.addPortfolio(resultado).subscribe(res=>{
      this.Portfolio = res;
      console.log("Datos en la variable Portfolio",this.Portfolio);
      this.service.getPorfolio(this.userDetails.email).subscribe(res=>{
        this.UserPortfolio = res;
      });
      //llamo a esta funcion para guardar el nuevo portfolio actualizado
       this.getPorfolio(); 
      // this.getPortfolioData();
      this.getPortfolioData();
    });

    // this.getPorfolio();

  }
///Descomentar para que funcione
  getPorfolio():void{
     this.service.getPorfolio(this.userDetails.email).subscribe(res=>{
      this.UserPortfolio = res;
      console.log("Necesito Esto :3",this.UserPortfolio);
      
       this.getPortfolioData();
     });
  }
 
  getPortfolioData(){
    // let prub = query;
    let keys: any[] = [];
    let keys1: (string | number)[] = [];
    var lista = this.UserPortfolio;
    console.table(this.UserPortfolio);
    // this.Keys.push(word);
    for(let k = 0; k < this.UserPortfolio.length; k++){
        keys.push(this.UserPortfolio[k]["ticker"]);
        // console.log("Lo que hay en k",this.UserPortfolio[k]["ticker"]);
        //poner aqui condicional si el parametro no esta vacio
    }

    this.Keys = keys; 

    console.log('Tabla de Keys');
    console.table(this.Keys);
    let arr4: Array<any> = Object.values(keys);
    for(let j = 0; j < keys.length; j++){
      let temp: string = keys[j];
      //antes temp en el parametro del tickerid
      this.service.getDepListTest(temp,this.interval, this.period).subscribe(res=>{
        // console.log("Key List: ", this.Keys);
        // console.log('Llaves', this.Keys[j]);
        this.ChartList = res;
        this.ChartList = JSON.parse(this.ChartList);
        console.log(this.ChartList);
        
        keys1 = this.ChartList['High']; //la fecha que tienen todos los campos

        var array:Array<any> = Object.values(keys1);//da cero
        var array1:Array<any> = Object.keys(keys1); //si da el valor de la fecha en epoch

        let arr: Array<any> =  Object.values(this.ChartList['Close']);
        let arr1: Array<any> = Object.values(this.ChartList['High']);
        let arr2: Array<any> = Object.values(this.ChartList['Open']);
        let arr3: Array<any> = Object.values(this.ChartList['Low']);
        
        // let arr4: Array<any> = this.values_ticker.push()

        //Para formatear los numeros
        // for (let iterator of arr) {
        //   let valor: Number = iterator.toFixed(2); 
        //   this.values_close.push(valor);     
        // }
       
        // var valor: Array<any> = arr;
        this.values_ticker.push(temp);
        // console.log('Esto',this.values_ticker);
        // this.values_ticker.push(arr4);
        this.values_close.push(arr);
        this.values_high.push(arr1);
        this.values_open.push(arr2);
        this.values_low.push(arr3);

        
      });
     }

  }
  delete(ticker:string){
    // if(confirm("Seguro de borrar este elemento?")){
      // console.log("Muy bien :3");
      this.service.deletePortfolio(this.ActualEmail, ticker).subscribe(data=>{
        // alert("Elemento eliminado con exito");
        console.log("Datos de DELETE",ticker, this.ActualEmail);
        this.getPorfolio();
      });
    // }
    console.log("Datos de DELETE",ticker, this.ActualEmail);
  }
  ngAfterViewInit(): void {
    // this.getPortfolioData();
  } 

  invest():void{

  }

//crear la ruta para la ventana que sera el nuevo componente y asi 
abrir(ticker:string) {
  // this.objeto_window_referencia = window.open("http://www.cnn.com/", "Pagina_CNN", this.configuracion_ventana);
  console.log("AAA");
  alert("The ticker which you want to invest is " + ticker);
}



@ViewChild('investValue') investValue!:ElementRef<HTMLInputElement>;

makeInvest():void{
console.log("Lalala",this.investValue.nativeElement.value)
const valor = this.investValue.nativeElement.value;
alert("You invest in " + this.investTicker + " " + valor + " . Thank you :3");
if (valor.trim().length === 0 ){
  return;
}else{
  
}

}
open(content: any, ticker:string) {
  this.investTicker = ticker;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
@ViewChild('addMountForm') addMountForm! : NgForm;

onSubmit(form: NgForm){
  console.log("adding form values ");
  console.log(form.value);
  console.log(this.tempInvest);
  console.log("Esto es lo que me manda",this.dateInvest.day);
  const formatDate = this.dateInvest.year + '-' + this.dateInvest.month + '-' +this.dateInvest.day;
  console.log("Fecha :3",formatDate);
  this.addInvest(this.ActualEmail, this.investTicker, this.tempInvest, formatDate);
}

addInvest(email:string, tickerTrade: string, amount:any, dateInvest:any):void{
var email = email;
var tickerTrade = tickerTrade;
var amount = amount;
var dateInvest= dateInvest;

const result = {email, tickerTrade, amount, dateInvest};
this.service.addInvest(result).subscribe(res=>{
  const something = res;
  console.log('Investing made: ', something);
  console.log("date ", this.dateInvest);
});

this.getInvestList();
}


getDataList(ticker:string){
  this.service.getInvests(this.ActualEmail, ticker).subscribe((data:any)=>{
    this.dataMeruko = JSON.parse(data);
    console.log(this.dataMeruko);
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  });
}
getInvestList(){
  let amount: any[] = [];
  let date: any[] = [];
  this.service.getInvests(this.ActualEmail, this.investTicker).subscribe(data=>{
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  
  });
  

  console.log("Otras inversiones",amount);
  console.log("Otras inversiones",date);
}

//Cambiarlo a otro componente

@ViewChild('investChart') investChart!: ElementRef;
drawChart = (list: any)=>{
  list = this.dataMeruko;
  // if(isEmptyObject(list)){
  //   this.datosChart = this.gold;
  // }
  console.log("Mis datos son: ", list);
  const data = new google.visualization.DataTable();
  let dates: Array<Date> = [];
  let cocoa = [];
  const name = this.investTicker;

  data.addColumn('datetime', 'Date');
  // String de nombre
  data.addColumn('number', 'Profits');

  var array: Array<string> = Object.values(this.dataMeruko.Date);

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
  const index = Object.keys(this.dataMeruko).length;
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
    // if(cocoa[i] == null){
    //   cocoa[i] = cocoa[i-1];
    // }
    // if(cocoa[i] > 0){
      data.addRows([[dates[i],this.dataMeruko.final[i]]]);
    // }
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
      0: { color: '#9a2b6c' }
    },
    explorer: { 
      //actions: ['dragToZoom', 'rightClickToReset'],
      axis: 'horizontal',
      maxZoomIn: 10,
      maxZoomOut: 7
      }
  };

  const chart = new google.visualization.AreaChart(this.investChart.nativeElement);
  chart.draw(data,options);

}


}