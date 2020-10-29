import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestApprovalsComponent } from './request-approvals.component';

describe('RequestApprovalsComponent', () => {
  let component: RequestApprovalsComponent;
  let fixture: ComponentFixture<RequestApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
