import { NgModule } from '@angular/core';
import { LoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SettingsCountriesComponent } from './settings-countries/settings-countries.component';
import { SettingsCitiesComponent } from './settings-cities/settings-cities.component';
import { SettingsStatesComponent } from './settings-states/settings-states.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingModule,
    ReactiveFormsModule,
  ],
  declarations: [SettingsCountriesComponent, SettingsCitiesComponent, SettingsStatesComponent]
})
export class SettingsModule { }
