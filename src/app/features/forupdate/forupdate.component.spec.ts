import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForupdateComponent } from './forupdate.component';

describe('ForupdateComponent', () => {
  let component: ForupdateComponent;
  let fixture: ComponentFixture<ForupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ForupdateComponent]
    });
    fixture = TestBed.createComponent(ForupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
