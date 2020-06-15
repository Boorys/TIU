import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingUsersComponent } from './sorting-users.component';

describe('SortingUsersComponent', () => {
  let component: SortingUsersComponent;
  let fixture: ComponentFixture<SortingUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
