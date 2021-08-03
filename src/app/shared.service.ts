import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleChartsModule } from 'angular-google-charts';


@Injectable({
  providedIn: 'root'
})
export class SharedService {


readonly APIUrl = "http://127.0.0.1:8000/";

  data: any = [];
  public ChartList: any = [];

  constructor(private http: HttpClient) { }
  
  getDepListTest(ticker_id: string, interval: string):Observable<any[]>{
    console.log(ticker_id);
    console.log(interval);
    this.data = this.http.get<any[]>(this.APIUrl + 'mostrar/' + ticker_id + '/' + interval);
    console.log("Datos",this.data);
    return this.http.get<any[]>(this.APIUrl + 'mostrar/' + ticker_id + '/' + interval);
  }

  getData(ticker_id: string, interval: string){
    this.http.get(this.APIUrl + 'mostrar/' + ticker_id + '/' + interval).subscribe(resp =>{
      // console.log(resp);
      this.ChartList = resp;
      this.ChartList = JSON.parse(this.ChartList);
    });
    return this.ChartList;
  }

  get ChartLists(){
      return this.ChartList;
  }

}
