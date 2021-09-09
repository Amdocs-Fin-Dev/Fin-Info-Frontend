import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartComponent } from './chart/chart.component';
import { LineChartComponent } from './chart/line-chart/line-chart.component';
import { CandleChartComponent } from './chart/candle-chart/candle-chart.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ChartAnalysisComponent } from './analysis/chart-analysis/chart-analysis.component';

const routes: Routes = [
  {path: 'mostrar/', component: ChartComponent},
  {path: 'line', component: LineChartComponent},
  {path: 'candle', component: CandleChartComponent},
  {path: 'analisis',component: ChartAnalysisComponent},
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
