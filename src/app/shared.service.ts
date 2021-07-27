import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://127.0.0.1:8000/";


  constructor(private http: HttpClient) { }

  getDepList():Observable<any[]>{
  
    return this.http.get<any[]>(this.APIUrl + 'mostrar/');
  }

  getDepListW():Observable<any[]>{
  
    return this.http.get<any[]>(this.APIUrl + 'line/w');
  }

  getDepListM():Observable<any[]>{
  
    return this.http.get<any[]>(this.APIUrl + 'line/m');
  }
  
}
