import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCountriesComponent } from './settings-countries.component';

describe('SettingsCountriesComponent', () => {
  let component: SettingsCountriesComponent;
  let fixture: ComponentFixture<SettingsCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
