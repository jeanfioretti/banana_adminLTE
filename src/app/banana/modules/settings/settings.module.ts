import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsCountriesComponent } from './settings-countries/settings-countries.component';
import { SettingsCitiesComponent } from './settings-cities/settings-cities.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SettingsCountriesComponent, SettingsCitiesComponent]
})
export class SettingsModule { }
