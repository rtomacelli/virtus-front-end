import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Sidenav } from './sidenav/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DataTablesModule } from 'angular-datatables';

import { PrevicMaterialModule } from '../material.module';

import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MAT_DATE_LOCALE} from '@angular/material/core';

import { HomeComponent } from './administration/home/home.component';
import { ActiveUserComponent } from './login/active-user/active-user.component';

import { DashboardUserComponent } from './administration/user/dashboard-user/dashboard-user.component';
import { AddUserComponent } from './administration/user/add-user/add-user.component';
import { EditUserComponent } from './administration/user/edit-user/edit-user.component';
import { ListUserComponent } from './administration/user/list-user/list-user.component';
import { DeleteUserComponent } from './administration/user/delete-user/delete-user.component';

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

import { AddRoleComponent } from './administration/role/add-role/add-role.component';
import { DashboardRoleComponent } from './administration/role/dashboard-role/dashboard-role.component';
import { DeleteRoleComponent } from './administration/role/delete-role/delete-role.component';
import { EditRoleComponent } from './administration/role/edit-role/edit-role.component';
import { ListRoleComponent } from './administration/role/list-role/list-role.component';

import { ExpandedRowComponent } from './sandbox/expanded-row/expanded-row.component';
import { ModalUsuariosComponent } from './administration/office/modal-usuarios/modal-usuarios.component';

@NgModule({
  declarations: [

    // Barra de navegação
    Sidenav,

    // Default do sistema
    AppComponent,

    // Página principal
    HomeComponent,

    // Usuário ativo no sistema
    ActiveUserComponent,

    //Usuários
    DashboardUserComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    DeleteUserComponent,
    ModalUsuariosComponent,

    // Workflow
    DashboardWorkflowComponent,
    DeleteWorkflowComponent,
    AddWorkflowComponent,
    EditWorkflowComponent,
    ListWorkflowComponent,

    // Status
    DashboardStatusComponent,
    AddStatusComponent,
    DeleteStatusComponent,
    EditStatusComponent,
    ListStatusComponent,

    // Escritórios
    DashboardOfficeComponent,
    ListOfficeComponent,
    AddOfficeComponent,
    EditOfficeComponent,
    DeleteOfficeComponent,

    // Funcionalidades
    DashboardFeatureComponent,
    AddFeatureComponent,
    EditFeatureComponent,
    ListFeatureComponent,
    DeleteFeatureComponent,

    // Ações
    DashboardActionComponent,
    AddActionComponent,
    EditActionComponent,
    ListActionComponent,
    DeleteActionComponent,

    // Papéis
    DashboardRoleComponent,
    AddRoleComponent,
    DeleteRoleComponent,
    EditRoleComponent,
    ListRoleComponent,

    // Sandbox
    ExpandedRowComponent    

  ],
  entryComponents: [

  ],
  imports: [
    FormsModule,
    AppRoutingModule,
    PrevicMaterialModule,
    BrowserAnimationsModule,
    DataTablesModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false} }
  ]
})

export class AppModule { }
