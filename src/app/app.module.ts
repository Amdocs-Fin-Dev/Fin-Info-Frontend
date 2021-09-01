import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { SharedService } from './shared.service';
import { GoogleChartsModule } from 'angular-google-charts'

import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineChartComponent } from './chart/line-chart/line-chart.component';
import { CandleChartComponent } from './chart/candle-chart/candle-chart.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoriteButtonComponent } from './chart/favorite-button/favorite-button.component';
import { AnalysisComponent } from './analysis/analysis.component';




@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    LineChartComponent,
    CandleChartComponent,
    LoginComponent,
    DashboardComponent,
    FavoriteButtonComponent,
    AnalysisComponent,

  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule
  ],
  providers: [
    SharedService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers:[
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '945529565086-5dv1q0mh9po4hgjlq3rvse054fj19e7t.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
