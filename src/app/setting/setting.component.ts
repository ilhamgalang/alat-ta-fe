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

  selectStatusTimeOn: boolean; 
  selectStatusTimeOff: boolean;

  deviceForm: FormGroup;

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
    // device form
    this.deviceForm = this.fb.group({
      nama_alat: ['', Validators.required],
      waktu_on: ['', Validators.required],
      waktu_off: ['', Validators.required],
      is_on: [''],
      is_off: ['']
    });
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
        this.dataDevice = response.data[0];
        // kondisi untuk status time on dan off
        this.selectStatusTimeOn = response.data[0].is_on == 1 ? true : false;
        this.selectStatusTimeOff = response.data[0].is_off == 1 ? true : false;
        // isi from device    // device form
        this.deviceForm = this.fb.group({
          nama_alat: [response.data[0].nama_alat, Validators.required],
          waktu_on: [response.data[0].waktu_on, Validators.required],
          waktu_off: [response.data[0].waktu_off, Validators.required],
          is_on: [this.selectStatusTimeOn],
          is_off: [this.selectStatusTimeOff]
        });
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
    // loading on
    this.loadingdataDevice = true;
    // proses delete
    this.api.deleteDeviceFromUser(idUserAlat).subscribe(
      response => {
        // refresh select
        this.getDataDeviceForSelect('1');
        // update device menjadi mati
        this.updateDeviceToOff(idAlat);
        // notif
        this.notif.success(response.message);
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
        this.api.updateStatusAlat('id_alat', data).subscribe(responseUpdate => {
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

  // button cancel
  resetFromDefault() {
    // reset form ketika pertama muncul
    this.deviceForm = this.fb.group({
      nama_alat: [this.dataDevice['nama_alat'], Validators.required],
      waktu_on: [this.dataDevice['waktu_on'], Validators.required],
      waktu_off: [this.dataDevice['waktu_off'], Validators.required],
      is_on: [this.selectStatusTimeOn],
      is_off: [this.selectStatusTimeOff]
    });
  }

  // button save
  saveFormDevice() {
    // loading on
    this.loadingdataDevice = true;
    // create variable on off
    let onOff: string;
    // cek apakah nama device tidak kosong 
    if (this.deviceForm.value.nama_alat != '' || this.deviceForm.value.nama_alat != null) {
      // get data terbaru
      this.api.getDataDeviceById(this.dataDevice['id_alat']).subscribe(response => {
        onOff = response.isOnOff;
      });
      const data = {
        'id_alat': this.dataDevice['id_alat'],
        'status_on_off': onOff,
        'password': this.dataDevice['password'],
        'waktu_on': this.deviceForm.value.waktu_on,
        'waktu_off': this.deviceForm.value.waktu_off,
        'nama_alat': this.deviceForm.value.nama_alat,
        'is_on': this.deviceForm.value.is_on == true ? 1 : 0,
        'is_off': this.deviceForm.value.is_off == true ? 1 : 0
      }
      // proses update
      this.api.updateStatusAlat('id_alat', data).subscribe(response => {
        if (response.status == 1) {
          // refresh select
          this.getDataDeviceForSelect('1');          
          // notif
          this.notif.success(response.message);
          // loading off
          this.loadingdataDevice = false;
        } else {
          // notif
          this.notif.error(response.message);
          // loading off
          this.loadingdataDevice = false;          
        }
      }, error => {
        // notif
        this.notif.error(error.message);
        // loading off
        this.loadingdataDevice = false;
      });
    } else {
      // notif
      this.notif.error('Device Name Can\'t Empty!');
    }
  }

}
