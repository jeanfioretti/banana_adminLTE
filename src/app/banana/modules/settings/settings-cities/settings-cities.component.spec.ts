import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCitiesComponent } from './settings-cities.component';

describe('SettingsCitiesComponent', () => {
  let component: SettingsCitiesComponent;
  let fixture: ComponentFixture<SettingsCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
