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
import { MatSelectModule } from "@angular/material/select";
import { MaterialModule } from '../material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { DashboardUserComponent } from './user/dashboard/dashboard.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';

import { AddWorkflowComponent } from './workflow/add-workflow/add-workflow.component';
import { EditWorkflowComponent } from './workflow/edit-workflow/edit-workflow.component';
import { ListWorkflowComponent } from './workflow/list-workflow/list-workflow.component';
import { DeleteWorkflowComponent } from './workflow/delete-workflow/delete-workflow.component';

import { AddStatusComponent } from './status/add-status/add-status.component';
import { EditStatusComponent } from './status/edit-status/edit-status.component';
import { ListStatusComponent } from './status/list-status/list-status.component';
import { DeleteStatusComponent } from './status/delete-status/delete-status.component';

import { AddOfficeComponent } from './office/add-office/add-office.component';
import { EditOfficeComponent } from './office/edit-office/edit-office.component';
import { ListOfficeComponent } from './office/list-office/list-office.component';
import { DeleteOfficeComponent } from './office/delete-office/delete-office.component';

import { AddFeatureComponent } from './feature/add-feature/add-feature.component';
import { EditFeatureComponent } from './feature/edit-feature/edit-feature.component';
import { ListFeatureComponent } from './feature/list-feature/list-feature.component';
import { DeleteFeatureComponent } from './feature/delete-feature/delete-feature.component';

import { AddActionComponent } from './action/add-action/add-action.component';
import { EditActionComponent } from './action/edit-action/edit-action.component';
import { ListActionComponent } from './action/list-action/list-action.component';
import { DeleteActionComponent } from './action/delete-action/delete-action.component';
import { HomeComponent } from './home/home.component';

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
    UserMenuComponent,
    DashboardUserComponent,
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
