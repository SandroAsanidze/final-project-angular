import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicDetailsComponent } from './technic-details.component';

describe('TechnicDetailsComponent', () => {
  let component: TechnicDetailsComponent;
  let fixture: ComponentFixture<TechnicDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TechnicDetailsComponent]
    });
    fixture = TestBed.createComponent(TechnicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
