 import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResourceComponent } from './display-resource.component';

describe('DisplayResourceComponent', () => {
  let component: DisplayResourceComponent;
  let fixture: ComponentFixture<DisplayResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
