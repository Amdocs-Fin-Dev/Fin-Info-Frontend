import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { SharedService } from './shared.service';
import { GoogleChartsModule } from 'angular-google-charts'

import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';
import { LineChartComponent } from './chart/line-chart/line-chart.component';
import { CandleChartComponent } from './chart/candle-chart/candle-chart.component';
import { WeekChartComponent } from './week-chart/week-chart.component';
import { MonthChartComponent } from './month-chart/month-chart.component';
import { MonthCandleChartComponent } from './chart/candle-chart/month-candle-chart/month-candle-chart.component';
import { WeekCandleChartComponent } from './chart/candle-chart/week-candle-chart/week-candle-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    PieChartComponent,
    LineChartComponent,
    CandleChartComponent,
    WeekChartComponent,
    MonthChartComponent,
    MonthCandleChartComponent,
    WeekCandleChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
