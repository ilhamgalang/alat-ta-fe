import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// api service
import { ListApiService } from '../service/list-api.service';
import { NotifService } from '../service/notif.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // variabel untuk menyimpan data device owned
  dataDeviceOwned: Object;
  loadingDataDeviceOwned: boolean = true; // tampilkan loading sampai data diterima
  isAddDevice: boolean = false; // kodisi untuk tombol add device

  dataDevice: Object;

  addNewDeviceForm: FormGroup;

  constructor(
    private router: Router,
    private api: ListApiService,
    private fb: FormBuilder,
    private notif: NotifService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    // set current path
    localStorage.setItem('cCurrentPath', 'home');
    // add new device form
    this.addNewDeviceForm = this.fb.group({
      id_alat: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get data device owned
    this.getDataDeviceOwned();
  }

  // set nilai untuk menampilkan atau menyembunyikan form add new device
  setIsAddDevice(state: boolean) {
    this.isAddDevice = state;
    // reset form add new device
    this.addNewDeviceForm.reset();
  }

  // get Data Device Owned
  getDataDeviceOwned() {
    // proses get data
    this.api.getDataOwnedShared(localStorage.getItem('cIdUser'), '1', 'id_user').subscribe(response => {
      this.dataDeviceOwned = response.data;
      // loading mati
      this.loadingDataDeviceOwned = false;
    }, error => { // jika terjadi error
      console.log(error);
      // loading mati
      this.loadingDataDeviceOwned = false;
      // notif error
      this.notif.error(error.message);
    });
  }

  // tambah device baru
  addNewDevice() {
    // spinner aktif
    this.spinner.show(); 
    // proses cek saat tambah device
    this.api.cekAddDevice(this.addNewDeviceForm.value).subscribe(response => {
      // cek apakah device ada atau tida
      if (response.status == 1) { // jika ada
        // tambah deveice
          // add variabel
          const data = {
            id_user: localStorage.getItem('cIdUser'),
            id_alat: this.addNewDeviceForm.value.id_alat,
            level: 1
          };
          // proses tambah
          this.api.addOrShareDevice(data).subscribe(responseAdd => {
            // cek apakah proses tambah berhasil dan tidak di gunakan oleh user lain
            if (responseAdd.status == 1) { // jika ya
              // refresh get data device
              this.getDataDeviceOwned();
              // reset form
              this.addNewDeviceForm.reset();
              // beri notif
              this.notif.success(responseAdd.message);
              // spinner mati
              this.spinner.hide();
              // kembali ke halaman sebelumnya
              this.setIsAddDevice(false);
            } else { // jika tidak atau sudah digunakan user lain
              // beri notif
              this.notif.warning(responseAdd.message);
              // spinner mati
              this.spinner.hide();
            }
          }, error => {
            console.log(error);
            // spinner mati
            this.spinner.hide();
            // notif error
            this.notif.error(error.message);
          });
      } else { // jika tidak ada
        // beri notif
        this.notif.error(response.message);
        // reset form
        this.addNewDeviceForm.reset();
        // spinner mati
        this.spinner.hide();
      }
    }, error => {
      console.log(error);
      // spinner mati
      this.spinner.hide();
      // notif error
      this.notif.error(error.message);
    });
  }

  // update tombol on off
  updateOnOff(id: string, isOnOff: number) {
    // cek data device by id
    this.api.getDataDeviceById(id).subscribe(response => {
      // jika data (on off) device dan action user sama
      if (response.data[0].status_on_off == isOnOff) {
        if (isOnOff == 0) {  // jika device sudah off
          // notif
          this.notif.info('Device Already Off!');
        } else { // jika device sudah on
          this.notif.info('Device Already On!');
        }
        // refresh get data
        this.getDataDeviceOwned();
      } else { // jika tidak
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
            // refresh get data
            this.getDataDeviceOwned();
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
