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
import { FooterComponent } from './footer/footer.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CarouselModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { ChartAnalysisComponent } from './analysis/chart-analysis/chart-analysis.component';
import { ComoditiesComponent } from './comodities/comodities.component';
import { ChartsComponent } from './comodities/charts/charts.component';
import { CarouselComponent } from './carousel/carousel.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { OwlModule } from 'ngx-owl-carousel';
// import { OwlModule } from 'ngx-owl-carousel';

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
    FooterComponent,
    SearchComponent,
    ChartAnalysisComponent,
    ComoditiesComponent,
    ChartsComponent,
    CarouselComponent

  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    CarouselModule,
    NgbModule,
    // OwlModule
    
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
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
