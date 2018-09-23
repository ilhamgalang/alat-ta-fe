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
//time picker -> material
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
// material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';

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
    MDBBootstrapModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger'
    }),
    NgxMaterialTimepickerModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatBadgeModule
  ],
  providers: [ListApiService, NotifService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
