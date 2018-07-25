import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCrudComponent } from './organization-crud.component';

describe('OrganizationCrudComponent', () => {
  let component: OrganizationCrudComponent;
  let fixture: ComponentFixture<OrganizationCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
