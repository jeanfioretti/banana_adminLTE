import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomColumnsComponent } from './custom-columns.component';

describe('CustomColumnsComponent', () => {
  let component: CustomColumnsComponent;
  let fixture: ComponentFixture<CustomColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
