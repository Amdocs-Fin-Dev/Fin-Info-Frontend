import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthCandleChartComponent } from './month-candle-chart.component';

describe('MonthCandleChartComponent', () => {
  let component: MonthCandleChartComponent;
  let fixture: ComponentFixture<MonthCandleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthCandleChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthCandleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
