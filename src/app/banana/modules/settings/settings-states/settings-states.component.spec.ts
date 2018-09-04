import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsStatesComponent } from './settings-states.component';

describe('SettingsStatesComponent', () => {
  let component: SettingsStatesComponent;
  let fixture: ComponentFixture<SettingsStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
