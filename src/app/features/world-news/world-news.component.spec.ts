import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldNewsComponent } from './world-news.component';

describe('WorldNewsComponent', () => {
  let component: WorldNewsComponent;
  let fixture: ComponentFixture<WorldNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorldNewsComponent]
    });
    fixture = TestBed.createComponent(WorldNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
