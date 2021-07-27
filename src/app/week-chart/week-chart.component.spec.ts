import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekChartComponent } from './week-chart.component';

describe('WeekChartComponent', () => {
  let component: WeekChartComponent;
  let fixture: ComponentFixture<WeekChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
