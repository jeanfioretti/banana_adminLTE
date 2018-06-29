import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartiesCrudComponent } from './third-parties-crud.component';

describe('ThirdPartiesCrudComponent', () => {
  let component: ThirdPartiesCrudComponent;
  let fixture: ComponentFixture<ThirdPartiesCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPartiesCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartiesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
