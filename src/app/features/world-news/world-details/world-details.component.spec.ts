import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldDetailsComponent } from './world-details.component';

describe('WorldDetailsComponent', () => {
  let component: WorldDetailsComponent;
  let fixture: ComponentFixture<WorldDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorldDetailsComponent]
    });
    fixture = TestBed.createComponent(WorldDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
