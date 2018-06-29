import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartiesListComponent } from './third-parties-list.component';

describe('ThirdPartiesListComponent', () => {
  let component: ThirdPartiesListComponent;
  let fixture: ComponentFixture<ThirdPartiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPartiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
