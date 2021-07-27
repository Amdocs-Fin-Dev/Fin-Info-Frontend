import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekCandleChartComponent } from './week-candle-chart.component';

describe('WeekCandleChartComponent', () => {
  let component: WeekCandleChartComponent;
  let fixture: ComponentFixture<WeekCandleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekCandleChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekCandleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
