import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsCountriesComponent } from './settings-countries/settings-countries.component';
import { SettingsCitiesComponent } from './settings-cities/settings-cities.component';
import { SettingsStatesComponent } from './settings-states/settings-states.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SettingsCountriesComponent, SettingsCitiesComponent, SettingsStatesComponent]
})
export class SettingsModule { }
