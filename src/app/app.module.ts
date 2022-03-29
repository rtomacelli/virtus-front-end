import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Sidenav } from './sidenav/sidenav';
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MaterialModule } from '../material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { DashboardUserComponent } from './administration/user/dashboard-user/dashboard-user.component';
import { AddUserComponent } from './administration/user/add-user/add-user.component';
import { EditUserComponent } from './administration/user/edit-user/edit-user.component';
import { ListUserComponent } from './administration/user/list-user/list-user.component';
import { DeleteUserComponent } from './administration/user/delete-user/delete-user.component';
import { SearchUserComponent } from './administration/user/search-user/search-user.component';

import { DashboardWorkflowComponent } from './administration/workflow/dashboard-workflow/dashboard-workflow.component';
import { AddWorkflowComponent } from './administration/workflow/add-workflow/add-workflow.component';
import { EditWorkflowComponent } from './administration/workflow/edit-workflow/edit-workflow.component';
import { ListWorkflowComponent } from './administration/workflow/list-workflow/list-workflow.component';
import { DeleteWorkflowComponent } from './administration/workflow/delete-workflow/delete-workflow.component';

import { DashboardStatusComponent } from './administration/status/dashboard-status/dashboard-status.component';
import { AddStatusComponent } from './administration/status/add-status/add-status.component';
import { EditStatusComponent } from './administration/status/edit-status/edit-status.component';
import { ListStatusComponent } from './administration/status/list-status/list-status.component';
import { DeleteStatusComponent } from './administration/status/delete-status/delete-status.component';

import { DashboardOfficeComponent } from './administration/office/dashboard-office/dashboard-office.component';
import { AddOfficeComponent } from './administration/office/add-office/add-office.component';
import { EditOfficeComponent } from './administration/office/edit-office/edit-office.component';
import { ListOfficeComponent } from './administration/office/list-office/list-office.component';
import { DeleteOfficeComponent } from './administration/office/delete-office/delete-office.component';

import { DashboardFeatureComponent } from './administration/feature/dashboard-feature/dashboard-feature.component';
import { AddFeatureComponent } from './administration/feature/add-feature/add-feature.component';
import { EditFeatureComponent } from './administration/feature/edit-feature/edit-feature.component';
import { ListFeatureComponent } from './administration/feature/list-feature/list-feature.component';
import { DeleteFeatureComponent } from './administration/feature/delete-feature/delete-feature.component';

import { DashboardActionComponent } from './administration/action/dashboard-action/dashboard-action.component';
import { AddActionComponent } from './administration/action/add-action/add-action.component';
import { EditActionComponent } from './administration/action/edit-action/edit-action.component';
import { ListActionComponent } from './administration/action/list-action/list-action.component';
import { DeleteActionComponent } from './administration/action/delete-action/delete-action.component';

import { HomeComponent } from './administration/home/home.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    Sidenav,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    DeleteUserComponent,
    DeleteWorkflowComponent,
    AddWorkflowComponent,
    EditWorkflowComponent,
    ListWorkflowComponent,
    AddStatusComponent,
    DeleteStatusComponent,
    EditStatusComponent,
    ListStatusComponent,
    ListOfficeComponent,
    AddOfficeComponent,
    EditOfficeComponent,
    DeleteOfficeComponent,
    AddFeatureComponent,
    EditFeatureComponent,
    ListFeatureComponent,
    DeleteFeatureComponent,
    AddActionComponent,
    EditActionComponent,
    ListActionComponent,
    DeleteActionComponent,
    HomeComponent,
    SearchUserComponent,
    DashboardOfficeComponent,
    DashboardUserComponent,
    DashboardWorkflowComponent,
    DashboardStatusComponent,
    DashboardFeatureComponent,
    DashboardActionComponent

  ],
  entryComponents: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
