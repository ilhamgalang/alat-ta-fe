import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// api service
import { ListApiService } from '../service/list-api.service';
import { NotifService } from '../service/notif.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  dataDeviceForSelect: Object = {};
  loadingDataDeviceSelect = true; // tampilkan loading sampai data diterima

  dataDevice: Object = {};
  loadingdataDevice = false; // tampilkan loading sampai data diterima

  constructor(
    private router: Router,
    private api: ListApiService,
    private fb: FormBuilder,
    private notif: NotifService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // set current path
    localStorage.setItem('cCurrentPath', 'setting');
    // get data device
    this.getDataDeviceForSelect('1');
  }

  // get data device untuk select
  getDataDeviceForSelect(select: any) {
    this.api
      .getDataOwnedShared(localStorage.getItem('cIdUser'), select, 'id_user')
      .subscribe(
        response => {
          this.dataDeviceForSelect = response;
          // loading mati
          this.loadingDataDeviceSelect = false;
        },
        error => {
          console.log(error);
          // notif error
          this.notif.error(error.message);
          // loading mati
          this.loadingDataDeviceSelect = false;
        }
      );
  }

  // get data device by id
  getDataDevice(id: any) {
    // loading on
    this.loadingdataDevice = true;
    const data = {
      id_alat: id,
      id_user: localStorage.getItem('cIdUser')
    };
    this.api.getDataDeviceSetting(data).subscribe(
      response => {
        this.dataDevice = response;
        // loading mati
        this.loadingdataDevice = false;
      },
      error => {
        console.log(error);
        // notif error
        this.notif.error(error.message);
        // loading mati
        this.loadingdataDevice = false;
      }
    );
  }

  // delete device from user
  deleteDeviceFromUser(id: string) {
    // spinner on
    this.spinner.show();
    // proses delete
    this.api.deleteDeviceFromUser(id).subscribe(
      response => {
        // refresh select
        this.getDataDeviceForSelect('1');
        // notif
        this.notif.success(response.message);
        // spinner off
        this.spinner.hide();
      },
      error => {
        console.log(error);
        // notif error
        this.notif.error(error.message);
        // spinner off
        this.spinner.hide();
      }
    );
  }
}
