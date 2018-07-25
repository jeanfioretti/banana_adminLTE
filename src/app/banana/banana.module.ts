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
import { CustomColumnsComponent } from './components/custom-columns/custom-columns.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { ContactComponent } from './components/contact/contact.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ComponentsModule } from './components/components.module';
import { LocalizationComponent } from './components/localization/localization.component';


@NgModule({
  imports: [
    CommonModule,
    BananaRoutingModule,
    ThirdPartiesModule,
    RolesModule,
    UsersModule,
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

  ]
})
export class BananaModule { }
