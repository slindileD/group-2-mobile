import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBookingsComponent } from './components/bookings/list-bookings/list-bookings.component';
import { MakeBookingComponent } from './components/bookings/make-booking/make-booking.component';
import { ManageBookingsComponent } from './components/bookings/manage-bookings/manage-bookings.component';
import { AddChildComponent } from './components/child/add-child/add-child.component';
import { UpdateChildComponent } from './components/child/update-child/update-child.component';
import { ViewChildDetailsComponent } from './components/child/view-child-details/view-child-details.component';
import { TakeSurveyComponent } from './components/communication/surveys/take-survey/take-survey.component';
import { ViewSurveysComponent } from './components/communication/surveys/view-surveys/view-surveys.component';
import { ViewCommunicationsComponent } from './components/communication/view-communications/view-communications.component';
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
  },
  {
    path: 'manage-bookings',
    component: ManageBookingsComponent
  },
  {
    path: 'make-new-booking',
    component: MakeBookingComponent
  },
  {
    path: 'list-bookings',
    component: ListBookingsComponent
  },
  {
    path: 'view-communications',
    component: ViewCommunicationsComponent
  },
  {
    path: 'view-surveys',
    component: ViewSurveysComponent
  },
  {
    path: 'take-survey/:id',
    component: TakeSurveyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule { }
