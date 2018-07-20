import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesCrudComponent } from './roles-crud.component';

describe('RolesCrudComponent', () => {
  let component: RolesCrudComponent;
  let fixture: ComponentFixture<RolesCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
