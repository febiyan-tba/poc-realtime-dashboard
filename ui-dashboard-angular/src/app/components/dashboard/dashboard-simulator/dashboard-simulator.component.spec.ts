import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSimulatorComponent } from './dashboard-simulator.component';

describe('DashboardSimulatorComponent', () => {
  let component: DashboardSimulatorComponent;
  let fixture: ComponentFixture<DashboardSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
