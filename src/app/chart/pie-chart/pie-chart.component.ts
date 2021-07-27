import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, AfterViewInit {
  @ViewChild('pieChart') pieChart!: ElementRef;
  drawChart = () => {

    const data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ]);

    const options = {
      title: 'Pie CHart',
      legend: {position: 'top'}
    };

    const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    chart.draw(data, options);
  }
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    google.charts.load('current', {packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

}
