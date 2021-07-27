import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartComponent } from './chart/chart.component';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';
import { LineChartComponent } from './chart/line-chart/line-chart.component';
import { CandleChartComponent } from './chart/candle-chart/candle-chart.component';
import { WeekChartComponent } from './week-chart/week-chart.component';
import { MonthChartComponent } from './month-chart/month-chart.component';
import { MonthCandleChartComponent } from './chart/candle-chart/month-candle-chart/month-candle-chart.component';
import { WeekCandleChartComponent } from './chart/candle-chart/week-candle-chart/week-candle-chart.component';
const routes: Routes = [
  {path: 'mostrar/', component: ChartComponent},
  {path: 'pie', component: PieChartComponent},
  {path: 'line', component: LineChartComponent},
  {path: 'candle', component: CandleChartComponent},
  {path: 'line/w', component: WeekChartComponent},
  {path: 'line/m', component: MonthChartComponent},
  {path: 'candle/w', component: WeekCandleChartComponent},
  {path: 'candle/m', component: MonthCandleChartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
