import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveUserComponent } from '../app/login/active-user/active-user.component'

import { HomeComponent } from './administration/home/home.component';

import { DashboardActionComponent } from './administration/action/dashboard-action/dashboard-action.component';
import { AddActionComponent } from './administration/action/add-action/add-action.component';
import { EditActionComponent } from './administration/action/edit-action/edit-action.component';
import { ListActionComponent } from './administration/action/list-action/list-action.component';

import { DashboardFeatureComponent } from './administration/feature/dashboard-feature/dashboard-feature.component';
import { AddFeatureComponent } from './administration/feature/add-feature/add-feature.component';
import { EditFeatureComponent } from './administration/feature/edit-feature/edit-feature.component';
import { ListFeatureComponent } from './administration/feature/list-feature/list-feature.component';

import { DashboardOfficeComponent } from './administration/office/dashboard-office/dashboard-office.component';
import { AddOfficeComponent } from './administration/office/add-office/add-office.component';
import { EditOfficeComponent } from './administration/office/edit-office/edit-office.component';
import { ListOfficeComponent } from './administration/office/list-office/list-office.component';

import { DashboardStatusComponent } from './administration/status/dashboard-status/dashboard-status.component';
import { AddStatusComponent } from './administration/status/add-status/add-status.component';
import { EditStatusComponent } from './administration/status/edit-status/edit-status.component';
import { ListStatusComponent } from './administration/status/list-status/list-status.component';

import { DashboardUserComponent } from './administration/user/dashboard-user/dashboard-user.component';
import { AddUserComponent } from './administration/user/add-user/add-user.component';
import { EditUserComponent } from './administration/user/edit-user/edit-user.component';
import { ListUserComponent } from './administration/user/list-user/list-user.component';
import { SearchUserComponent } from './administration/user/search-user/search-user.component';

import { DashboardWorkflowComponent } from './administration/workflow/dashboard-workflow/dashboard-workflow.component';
import { AddWorkflowComponent } from './administration/workflow/add-workflow/add-workflow.component';
import { EditWorkflowComponent } from './administration/workflow/edit-workflow/edit-workflow.component';
import { ListWorkflowComponent } from './administration/workflow/list-workflow/list-workflow.component';

const routes: Routes = [
  
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: 'home', component: HomeComponent },

  { path: 'activeUser', component: ActiveUserComponent },

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