import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddChildComponent } from './components/child/add-child/add-child.component';
import { UpdateChildComponent } from './components/child/update-child/update-child.component';
import { ViewChildDetailsComponent } from './components/child/view-child-details/view-child-details.component';
import { CreateProfileComponent } from './components/profile/create-profile/create-profile.component';
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'create-profile',
    component: CreateProfileComponent
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent
  },
  {
    path: 'view-profile',
    component: ViewProfileComponent
  },
  {
    path: 'add-child',
    component: AddChildComponent
  },
  {
    path: 'update-child',
    component: UpdateChildComponent
  },
  {
    path: 'view-child-details',
    component: ViewChildDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule { }
