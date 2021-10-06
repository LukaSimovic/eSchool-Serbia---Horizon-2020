import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpravljanjeNastComponent } from './upravljanje-nast.component';

describe('UpravljanjeNastComponent', () => {
  let component: UpravljanjeNastComponent;
  let fixture: ComponentFixture<UpravljanjeNastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpravljanjeNastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpravljanjeNastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
