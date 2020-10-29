import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentApprovalsComponent } from './sent-approvals.component';

describe('SentApprovalsComponent', () => {
  let component: SentApprovalsComponent;
  let fixture: ComponentFixture<SentApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
