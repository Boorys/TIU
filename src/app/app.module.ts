import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowComponent } from './components/window/window.component';
import { TableComponent } from './components/table/table.component';
import {HttpClientModule} from "@angular/common/http";
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { HeaderComponent } from './components/header/header.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { MoreInformationComponent } from './components/more-information/more-information.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ExportDataComponent } from './components/export-data/export-data.component';
import { SortingUsersComponent } from './components/sorting-users/sorting-users.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { WindowDataComponent } from './components/window-data/window-data.component';



@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    TableComponent,
    UpdateUserComponent,
    HeaderComponent,
    AddUserComponent,
    MoreInformationComponent,
    LoginComponent,
    WelcomeComponent,
    ExportDataComponent,
    SortingUsersComponent,
    TableDataComponent,
    WindowDataComponent,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
