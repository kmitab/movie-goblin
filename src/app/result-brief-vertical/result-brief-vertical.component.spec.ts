import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultBriefVerticalComponent } from './result-brief-vertical.component';

describe('ResultBriefVerticalComponent', () => {
  let component: ResultBriefVerticalComponent;
  let fixture: ComponentFixture<ResultBriefVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultBriefVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBriefVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
