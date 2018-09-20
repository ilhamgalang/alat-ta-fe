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
  deleteDeviceFromUser(idUserAlat: string, idAlat: string) {
    // spinner on
    this.spinner.show();
    // proses delete
    this.api.deleteDeviceFromUser(idUserAlat).subscribe(
      response => {
        // refresh select
        this.getDataDeviceForSelect('1');
        // update device menjadi mati
        this.updateDeviceToOff(idAlat);
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

  // update status lampu yang di hapus menjadi off
  updateDeviceToOff(id: string) {
    // set variabel 0
    const isOnOff = 0;
    // cek data device by id
    this.api.getDataDeviceById(id).subscribe(response => {
      console.log(response);
      // jika lampu dalam status menyala
      if (response.data[0].status_on_off == 1) {
        // variabel untuk update
        const data = {
          id_alat: response.data[0].id_alat,
          status_on_off: isOnOff,
          waktu_on: response.data[0].waktu_on,
          waktu_off: response.data[0].waktu_off,
          is_on: response.data[0].is_on,
          is_off: response.data[0].is_off,
          nama_alat: response.data[0].nama_alat
        }
        // proses update
        this.api.updateOnOff('id_alat', data).subscribe(responseUpdate => {
          // jika proses berhasil
          if (responseUpdate.status == 1) {
            // tambahkan action ke record
              // variabel record
              const addRecord = {
                id_user: localStorage.getItem('cIdUser'),
                id_alat: response.data[0].id_alat,
                turn_on_off: isOnOff,
				        is_new_record: 1
              }
              // proses add record
              this.api.addRecord(addRecord).subscribe(renponseAddRecord => {
                // success record
              }, error => {
                console.log(error);
                // notif error
                this.notif.error(error.message);
              });
          } else { // jika update gagal
            // notif error
            this.notif.error(responseUpdate.message);
          }
        }, error => {
          console.log(error);
          // notif error
          this.notif.error(error.message);
        })
      }
    }, error => {
      console.log(error);
      // notif error
      this.notif.error(error.message);
    });
  }
}
