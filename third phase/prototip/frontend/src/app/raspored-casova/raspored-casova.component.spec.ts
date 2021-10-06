import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasporedCasovaComponent } from './raspored-casova.component';

describe('RasporedCasovaComponent', () => {
  let component: RasporedCasovaComponent;
  let fixture: ComponentFixture<RasporedCasovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasporedCasovaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RasporedCasovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
