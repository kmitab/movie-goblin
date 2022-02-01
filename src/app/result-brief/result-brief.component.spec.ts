import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultBriefComponent } from './result-brief.component';

describe('ResultBriefComponent', () => {
  let component: ResultBriefComponent;
  let fixture: ComponentFixture<ResultBriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultBriefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
