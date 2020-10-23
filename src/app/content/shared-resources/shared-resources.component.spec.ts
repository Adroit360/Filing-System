import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedResourcesComponent } from './shared-resources.component';

describe('SharedResourcesComponent', () => {
  let component: SharedResourcesComponent;
  let fixture: ComponentFixture<SharedResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
