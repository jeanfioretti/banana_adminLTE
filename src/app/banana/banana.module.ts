import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  imports: [
    CommonModule,
    BananaRoutingModule,
    ThirdPartiesModule,
    LoadingModule,
    FormsModule
  ],
  declarations: [
    BananaComponent,
    BananaFooterComponent,
    BananaHeaderComponent,
    BananaLeftSideComponent,
    BananaContentComponent,
    BananaControlSidebarComponent,
    CustomColumnsComponent
  ]
})
export class BananaModule { }
