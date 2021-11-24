import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  constructor(private service: SharedService) { }

  dataAnalisis: any = [];
  rsiState: string = "";
  adxState: string = "";
  stoOsState: string = "";
  avgTrueState: string = "";
  tickerid: any = localStorage.getItem('ticker_id');

  ngOnInit(): void {
    this.showAnalysis();
  }

  showAnalysis(){
    this.service.getAnalisis(this.tickerid, "1").subscribe(data=>{
      this.dataAnalisis = data;
      this.dataAnalisis = JSON.parse(this.dataAnalisis);
      console.table(this.dataAnalisis);
      console.log(this.dataAnalisis["rsi"]);
      this.RSIstateCalculator();
      this.ADXStateCalculator();
      this.StochasticOsCalculator();
      this.AvgTrueRangeCalculator();
    });
  }

  RSIstateCalculator(){
    if(this.dataAnalisis.rsi > 70){
      this.rsiState = "Overbought";
      document.getElementById("rsi")!.style.color = '#00ff00';
    }
    else if(this.dataAnalisis.rsi > 30 && this.dataAnalisis.rsi < 50 ){
      this.rsiState = "Neutral";
    }
    else if(this.dataAnalisis.rsi > 50 && this.dataAnalisis.rsi < 70 ){
      this.rsiState = "Buy";
      document.getElementById("rsi")!.style.color = '#00ff00';

    } 
    else{
      //less than 30
      this.rsiState = "Oversold";
      document.getElementById("rsi")!.style.color = '#dc3545';

    }
  }

  ADXStateCalculator(){
    if(this.dataAnalisis.adx > 0 && this.dataAnalisis.adx < 25){
        this.adxState = "Weak Trend";
        document.getElementById("adx")!.style.color = '#dc3545';
    }else if(this.dataAnalisis.adx > 25 && this.dataAnalisis.adx < 50){
      this.adxState = "Strong Trend";
      document.getElementById("adx")!.style.color = '#00ff00';
    }else if(this.dataAnalisis.adx > 50 && this.dataAnalisis.adx < 75){
      this.adxState = "Very Strong Trend";
      document.getElementById("adx")!.style.color = '#00ff00';

    }
    //More than 75
    else{
      this.adxState = "Extremely Strong Trend";
      document.getElementById("adx")!.style.color = '#00ff00';

    }
  }

  StochasticOsCalculator(){
    if(this.dataAnalisis.stOscillator > 70){
      this.stoOsState = "Overbought";
      document.getElementById("sto")!.style.color = '#00ff00';

    }
    else if(this.dataAnalisis.stOscillator > 30 && this.dataAnalisis.stOscillator < 50 ){
      this.stoOsState = "Neutral";
    }
    else if(this.dataAnalisis.stOscillator > 50 && this.dataAnalisis.stOscillator < 70 ){
      this.stoOsState = "Buy";
      document.getElementById("sto")!.style.color = '#00ff00';

    } 
    else{
      //less than 30
      this.stoOsState = "Oversold";
      document.getElementById("sto")!.style.color = '#dc3545';

    }
  }

  AvgTrueRangeCalculator(){

    if(this.dataAnalisis.AvgTrueRange < 25){
      this.avgTrueState = "Less Volatility";
      document.getElementById("avg")!.style.color = '#00ff00';

    }
    else{
      this.avgTrueState = "High Volatility";
      document.getElementById("avg")!.style.color = '#dc3545';

    }

  }
}
