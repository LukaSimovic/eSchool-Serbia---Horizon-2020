import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpisiOceneComponent } from './upisi-ocene.component';

describe('UpisiOceneComponent', () => {
  let component: UpisiOceneComponent;
  let fixture: ComponentFixture<UpisiOceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpisiOceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpisiOceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
