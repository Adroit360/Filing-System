import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyApprovalsComponent } from './reply-approvals.component';

describe('ReplyApprovalsComponent', () => {
  let component: ReplyApprovalsComponent;
  let fixture: ComponentFixture<ReplyApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
