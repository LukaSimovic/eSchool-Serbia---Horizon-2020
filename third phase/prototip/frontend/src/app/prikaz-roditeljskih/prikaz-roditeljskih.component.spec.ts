import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazRoditeljskihComponent } from './prikaz-roditeljskih.component';

describe('PrikazRoditeljskihComponent', () => {
  let component: PrikazRoditeljskihComponent;
  let fixture: ComponentFixture<PrikazRoditeljskihComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazRoditeljskihComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazRoditeljskihComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
