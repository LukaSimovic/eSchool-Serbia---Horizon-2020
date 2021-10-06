import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoditeljComponent } from './roditelj.component';

describe('RoditeljComponent', () => {
  let component: RoditeljComponent;
  let fixture: ComponentFixture<RoditeljComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoditeljComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoditeljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
