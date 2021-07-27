import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private service:SharedService) { }

  ChartList: any = [];
  
  ngOnInit(): void {
    this.refreshChartList();

/*     $(document).ready(function() {
      alert('I am Called From jQuery');
    }); */

/*     $(document).ready(function() {
      $('#my-button').click(1);
    }); */
  }


  refreshChartList(){
    this.service.getDepList().subscribe(data=>{
      this.ChartList = data;
      this.ChartList = JSON.parse(this.ChartList)
      console.log(typeof(this.ChartList))
      console.log(this.ChartList)
    });

    
  }

}
