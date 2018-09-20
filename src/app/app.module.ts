import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControlDirective } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// mdbbootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// sweetalert2 - ngx
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
// ngx-spinner
import { NgxSpinnerModule } from 'ngx-spinner';
// ngx datatable
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// ngx-material-timepicker
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
// animation material design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

// service
import { ListApiService } from './service/list-api.service';
import { NotifService } from './service/notif.service';

// component
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SettingComponent } from './setting/setting.component';
import { RecordComponent } from './record/record.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    SettingComponent,
    RecordComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    NgxMaterialTimepickerModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger'
    })
  ],
  providers: [ListApiService, NotifService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
