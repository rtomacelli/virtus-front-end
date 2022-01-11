import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//ENVIRONMENTS
import { EnvironmentDashboardComponent } from './features/environments/environment-dashboard/environment-dashboard.component';
import { EnvironmentListComponent } from './features/environments/environment-list/environment-list.component';
import { EnvironmentFormComponent } from './features/environments/environment-form/environment-form.component';
// CONTEXTS
import { ContextDashboardComponent } from './features/contexts/context-dashboard/context-dashboard.component';
import { ContextListComponent } from './features/contexts/context-list/context-list.component';
import { ContextFormComponent } from './features/contexts/context-form/context-form.component';
// FEATURES
import { FeatureDashboardComponent } from './features/features/feature-dashboard/feature-dashboard.component';
import { FeatureListComponent } from './features/features/feature-list/feature-list.component';
import { FeatureFormComponent } from './features/features/feature-form/feature-form.component';
// NUMBERS
import { NumberDashboardComponent } from './features/numbers/number-dashboard/number-dashboard.component';
import { NumberListComponent } from './features/numbers/number-list/number-list.component';
import { NumberFormComponent } from './features/numbers/number-form/number-form.component';
// PARAMETERS
import { ParameterDashboardComponent } from './features/parameters/parameter-dashboard/parameter-dashboard.component';
import { ParameterListComponent } from './features/parameters/parameter-list/parameter-list.component';
import { ParameterFormComponent } from './features/parameters/parameter-form/parameter-form.component';
// RUNS
import { RunDashboardComponent } from './features/runs/run-dashboard/run-dashboard.component';
import { RunListComponent } from './features/runs/run-list/run-list.component';
import { RunFormComponent } from './features/runs/run-form/run-form.component';
// SCENARIOS
import { ScenarioDashboardComponent } from './features/scenarios/scenario-dashboard/scenario-dashboard.component';
import { ScenarioListComponent } from './features/scenarios/scenario-list/scenario-list.component';
import { ScenarioFormComponent } from './features/scenarios/scenario-form/scenario-form.component';
// STEPS
import { StepDashboardComponent } from './features/steps/step-dashboard/step-dashboard.component';
import { StepListComponent } from './features/steps/step-list/step-list.component';
import { StepFormComponent } from './features/steps/step-form/step-form.component';
// TEST-CASES
import { TestCaseDashboardComponent } from './features/test-cases/test-case-dashboard/test-case-dashboard.component';
import { TestCaseListComponent } from './features/test-cases/test-case-list/test-case-list.component';
import { TestCaseFormComponent } from './features/test-cases/test-case-form/test-case-form.component';
// USERS
import { UserDashboardComponent } from './features/users/user-dashboard/user-dashboard.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { UserFormComponent } from './features/users/user-form/user-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/dashboard', pathMatch: 'full' },
  { path: 'context/list', component: ContextListComponent },
  { path: 'context/edit/:id', component: ContextFormComponent },
  { path: 'context/add', component: ContextFormComponent },
  { path: 'context/dashboard', component: ContextDashboardComponent },
  { path: 'environment/list', component: EnvironmentListComponent },
  { path: 'environment/edit/:id', component: EnvironmentFormComponent },
  { path: 'environment/add', component: EnvironmentFormComponent },
  { path: 'environment/dashboard', component: EnvironmentDashboardComponent },
  { path: 'feature/list', component: FeatureListComponent },
  { path: 'feature/edit/:id', component: FeatureFormComponent },
  { path: 'feature/add', component: FeatureFormComponent },
  { path: 'feature/dashboard', component: FeatureDashboardComponent },
  { path: 'number/list', component: NumberListComponent },
  { path: 'number/edit/:id', component: NumberFormComponent },
  { path: 'number/add', component: NumberFormComponent },
  { path: 'number/dashboard', component: NumberDashboardComponent },
  { path: 'parameter/list', component: ParameterListComponent },
  { path: 'parameter/edit/:id', component: ParameterFormComponent },
  { path: 'parameter/add', component: ParameterFormComponent },
  { path: 'parameter/dashboard', component: ParameterDashboardComponent },
  { path: 'run/list', component: RunListComponent },  
  { path: 'run/edit/:id', component: RunFormComponent },
  { path: 'run/add', component: RunFormComponent },
  { path: 'run/dashboard', component: RunDashboardComponent },
  { path: 'scenario/list', component: ScenarioListComponent },
  { path: 'scenario/edit/:id', component: ScenarioFormComponent },
  { path: 'scenario/add', component: ScenarioFormComponent },
  { path: 'scenario/dashboard', component: ScenarioDashboardComponent },
  { path: 'step/list', component: StepListComponent },
  { path: 'step/edit/:id', component: StepFormComponent },
  { path: 'step/add', component: StepFormComponent },
  { path: 'step/dashboard', component: StepDashboardComponent },
  { path: 'test-case/list', component: TestCaseListComponent },
  { path: 'test-case/edit/:id', component: TestCaseFormComponent },
  { path: 'test-case/add', component: TestCaseFormComponent },
  { path: 'test-case/dashboard', component: TestCaseDashboardComponent },
  { path: 'user/list', component: UserListComponent },
  { path: 'user/edit/:id', component: UserFormComponent },
  { path: 'user/add', component: UserFormComponent },
  { path: 'user/dashboard', component: UserDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
