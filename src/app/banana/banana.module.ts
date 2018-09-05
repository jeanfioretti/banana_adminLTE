import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';
import { BananaRoutingModule } from './banana-routing.module';
import { BananaComponent } from './banana.component';
import { BananaFooterComponent } from './banana-footer/banana-footer.component';
import { BananaHeaderComponent } from './banana-header/banana-header.component';
import { BananaLeftSideComponent } from './banana-left-side/banana-left-side.component';
import { BananaContentComponent } from './banana-content/banana-content.component';
import { BananaControlSidebarComponent } from './banana-control-sidebar/banana-control-sidebar.component';
import { ThirdPartiesModule } from './modules/third-parties/third-parties.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { ComponentsModule } from './components/components.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MigrationsModule } from './modules/migrations/migrations.module';
import { SettingsModule } from './modules/settings/settings.module';
import { LocationService } from './services/locations/location.service';


@NgModule({
  imports: [
    CommonModule,
    BananaRoutingModule,
    DashboardModule,
    ThirdPartiesModule,
    RolesModule,
    UsersModule,
    SettingsModule,
    MigrationsModule,
    OrganizationsModule,
    LoadingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [
    BananaComponent,
    BananaFooterComponent,
    BananaHeaderComponent,
    BananaLeftSideComponent,
    BananaContentComponent,
    BananaControlSidebarComponent,
 //   CustomColumnsComponent,
   // ContactComponent,
   // EditFormComponent,

  ],
  providers: [
    LocationService
  ]
})
export class BananaModule { }
