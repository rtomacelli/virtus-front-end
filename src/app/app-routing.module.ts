import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { DashboardActionComponent } from './action/dashboard/dashboard.component';
import { AddActionComponent } from './action/add-action/add-action.component';
import { EditActionComponent } from './action/edit-action/edit-action.component';
import { ListActionComponent } from './action/list-action/list-action.component';

import { DashboardFeatureComponent } from './feature/dashboard/dashboard.component';
import { AddFeatureComponent } from './feature/add-feature/add-feature.component';
import { EditFeatureComponent } from './feature/edit-feature/edit-feature.component';
import { ListFeatureComponent } from './feature/list-feature/list-feature.component';

import { DashboardOfficeComponent } from './office/dashboard/dashboard.component';
import { AddOfficeComponent } from './office/add-office/add-office.component';
import { EditOfficeComponent } from './office/edit-office/edit-office.component';
import { ListOfficeComponent } from './office/list-office/list-office.component';

import { DashboardStatusComponent } from './status/dashboard/dashboard.component';
import { AddStatusComponent } from './status/add-status/add-status.component';
import { EditStatusComponent } from './status/edit-status/edit-status.component';
import { ListStatusComponent } from './status/list-status/list-status.component';

import { DashboardUserComponent } from './user/dashboard/dashboard.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { SearchUserComponent } from './user/search-user/search-user.component';

import { DashboardWorkflowComponent } from './workflow/dashboard/dashboard.component';
import { AddWorkflowComponent } from './workflow/add-workflow/add-workflow.component';
import { EditWorkflowComponent } from './workflow/edit-workflow/edit-workflow.component';
import { ListWorkflowComponent } from './workflow/list-workflow/list-workflow.component';



const routes: Routes = [
  
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: 'home', component: HomeComponent },

  { path: 'action/dashboard', component: DashboardActionComponent },
  { path: 'action/add', component: AddActionComponent },
  { path: 'action/edit/:id', component: EditActionComponent },
  { path: 'action/list', component: ListActionComponent },

  { path: 'feature/dashboard', component: DashboardFeatureComponent },
  { path: 'feature/add', component: AddFeatureComponent },
  { path: 'feature/edit/:id', component: EditFeatureComponent },
  { path: 'feature/list', component: ListFeatureComponent },

  { path: 'office/dashboard', component: DashboardOfficeComponent },
  { path: 'office/add', component: AddOfficeComponent },
  { path: 'office/edit/:id', component: EditOfficeComponent },
  { path: 'office/list', component: ListOfficeComponent },

  { path: 'status/dashboard', component: DashboardStatusComponent },
  { path: 'status/add', component: AddStatusComponent },
  { path: 'status/edit/:id', component: EditStatusComponent },
  { path: 'status/list', component: ListStatusComponent },

  { path: 'user/dashboard', component: DashboardUserComponent },
  { path: 'user/add', component: AddUserComponent },
  { path: 'user/edit/:id', component: EditUserComponent },
  { path: 'user/list', component: ListUserComponent },
  { path: 'user/search', component: SearchUserComponent },

  { path: 'workflow/dashboard', component: DashboardWorkflowComponent },
  { path: 'workflow/add', component: AddWorkflowComponent },
  { path: 'workflow/edit/:id', component: EditWorkflowComponent },
  { path: 'workflow/list', component: ListWorkflowComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}