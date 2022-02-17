import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultBriefHorizontalComponent } from './result-brief-horizontal.component';

describe('ResultBriefHorizontalComponent', () => {
  let component: ResultBriefHorizontalComponent;
  let fixture: ComponentFixture<ResultBriefHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultBriefHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBriefHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
