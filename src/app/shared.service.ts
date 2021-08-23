import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleChartsModule } from 'angular-google-charts';


@Injectable({
  providedIn: 'root'
})
export class SharedService {


readonly APIUrl = "http://127.0.0.1:8000/";

  public portafolio: any = [];
  data: any = [];
  public ChartList: any = [];

  constructor(private http: HttpClient) { }
  
  getDepListTest(ticker_id: string, interval: string, period:string):Observable<any[]>{
    // console.log(ticker_id);
    // console.log(interval);
    this.data = this.http.get<any[]>(this.APIUrl + 'mostrar/' + ticker_id + '/' + interval + '/' + period);
    // console.log("Datos",this.data);
    return this.http.get<any[]>(this.APIUrl + 'mostrar/' + ticker_id + '/' + interval  + '/' + period);
  }

  getData(ticker_id: string, interval: string, period:string){
    this.http.get(this.APIUrl + 'mostrar/' + ticker_id + '/' + interval  + '/' + period).subscribe(resp =>{
      // console.log(resp);
      this.ChartList = resp;
      this.ChartList = JSON.parse(this.ChartList);
    });
    return this.ChartList;
  }

  get ChartLists(){
      return this.ChartList;
  }

//For Dashboard and accounts 
//Using account as first route
  getUserList():Observable<any[]>{
    this.data = this.http.get<any[]>(this.APIUrl + 'account/api/' );
    // console.log("Datos",this.data);
    return this.http.get<any[]>(this.APIUrl + 'account/api/');
  }

  addUser(val:any){
    return this.http.post<any>(this.APIUrl + 'account/api/', val);
  }

  getPorfolio(email: string):Observable<any[]>{
    this.data = this.http.get<any[]>(this.APIUrl + 'account/portfolio/' + email +'/');
    return this.data = this.http.get<any[]>(this.APIUrl + 'account/portfolio/' + email);

  }

  addPortfolio(val:any){
    return this.http.post<any>(this.APIUrl+ 'account/addfavorites/',val);
  }

  deletePortfolio(email:string, ticker: string){
    return this.http.delete<any>(this.APIUrl + 'account/portfolio/' + email + '/' + ticker);
  }

  buscarQuery(query: string){
    this.getPorfolio('aklivmairkoo@gmail.com').subscribe(res=>{
      this.portafolio = res;
      console.log("nuevo port: ",this.portafolio);
    });
  }

}
