import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddChildComponent } from './components/child/add-child/add-child.component';
import { ViewChildDetailsComponent } from './components/child/view-child-details/view-child-details.component';
import { CreateProfileComponent } from './components/profile/create-profile/create-profile.component';

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
    path: 'add-child',
    component: AddChildComponent
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
