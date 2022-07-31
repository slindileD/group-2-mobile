import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


import { FolderPage } from './folder.page';
import { CreateProfileComponent } from './components/profile/create-profile/create-profile.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { AddChildComponent } from './components/child/add-child/add-child.component';
import { ViewChildDetailsComponent } from './components/child/view-child-details/view-child-details.component';
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';
import { UpdateChildComponent } from './components/child/update-child/update-child.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FolderPageRoutingModule,
    MaterialModule,
    NgxQRCodeModule
  ],
  declarations: [
    FolderPage,
    CreateProfileComponent,
    AddChildComponent,
    ViewChildDetailsComponent,
    UpdateProfileComponent,
    ViewProfileComponent,
    UpdateChildComponent
  ]
})
export class FolderPageModule { }
