import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakaziRoditeljskiComponent } from './zakazi-roditeljski.component';

describe('ZakaziRoditeljskiComponent', () => {
  let component: ZakaziRoditeljskiComponent;
  let fixture: ComponentFixture<ZakaziRoditeljskiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZakaziRoditeljskiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakaziRoditeljskiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
