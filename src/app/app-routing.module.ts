import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { WindowComponent } from './components/window/window.component';
import { TableComponent } from './components/table/table.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { MoreInformationComponent } from './components/more-information/more-information.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouteGuardAdminService } from './service/route-guard-admin.service';
import { RouteGuardUserService } from './service/route-guard-user.service';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent },
  { path: 'update/:id', component: UpdateUserComponent },
  { path: 'table', component: TableComponent, canActivate:[RouteGuardUserService]},
  { path: 'window', component: WindowComponent , canActivate:[RouteGuardUserService]},
  { path: 'add', component: AddUserComponent , canActivate:[RouteGuardAdminService]},
  { path: 'more/:id', component: MoreInformationComponent , canActivate:[RouteGuardUserService]},
  { path: 'welcome', component:  WelcomeComponent , canActivate:[RouteGuardUserService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
