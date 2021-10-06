import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpravljanjeUcenComponent } from './upravljanje-ucen.component';

describe('UpravljanjeUcenComponent', () => {
  let component: UpravljanjeUcenComponent;
  let fixture: ComponentFixture<UpravljanjeUcenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpravljanjeUcenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpravljanjeUcenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
