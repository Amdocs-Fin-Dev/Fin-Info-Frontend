import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthChartComponent } from './month-chart.component';

describe('MonthChartComponent', () => {
  let component: MonthChartComponent;
  let fixture: ComponentFixture<MonthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
