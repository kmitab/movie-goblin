import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFullComponent } from './result-full.component';

describe('ResultFullComponent', () => {
  let component: ResultFullComponent;
  let fixture: ComponentFixture<ResultFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
