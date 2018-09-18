import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private api: ListApiService,
    private notif: NotifService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    // set current path
    localStorage.setItem('cCurrentPath', 'home');
    // get data device owned
    this.getDataDeviceOwned();
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
}
