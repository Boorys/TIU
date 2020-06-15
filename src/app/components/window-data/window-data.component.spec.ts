import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowDataComponent } from './window-data.component';

describe('WindowDataComponent', () => {
  let component: WindowDataComponent;
  let fixture: ComponentFixture<WindowDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
