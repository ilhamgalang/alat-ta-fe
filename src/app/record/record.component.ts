import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// api service
import { ListApiService } from '../service/list-api.service';
import { NotifService } from '../service/notif.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  dataRecord: Object;
  loadingDataRecord = true;

  dataStatistik: Object;
  loadingDataStatistik = true;

  constructor(
    private router: Router,
    private api: ListApiService,
    private notif: NotifService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // set current path
    localStorage.setItem('cCurrentPath', 'record');
    // get data record
    this.getRecordByIdUser();
    // get data statistik
    this.getDataStatistik();
  }

  // get data record by id user
  getRecordByIdUser() {
    // variable untuk post data record
    const data = {
      id_user: localStorage.getItem('cIdUser'),
      is_new: 1
    };
    // proses get data record
    this.api.getDataRecord(data).subscribe(
      response => {
        // simpan hasil ke variable dataRecord
        this.dataRecord = response;
        // loading off
        this.loadingDataRecord = false;
      },
      error => {
      // notif error
      this.notif.error(error.message);
      // loading off
      this.loadingDataRecord = false;
      // init data
       this.dataRecord = [];
      }
    );
  }

  // get data statistik
  getDataStatistik() {
    // data untuk get statistik
    const data = {
      id_user: localStorage.getItem('cIdUser'),
      is_new_record: 1
    };
    // proses get data
    this.api.getDataStatistik(data).subscribe(
      response => {
        // tampung hasil pada variabel
        this.dataStatistik = response;
        // loading off
        this.loadingDataStatistik = false;
    },
    error => {
      // notif error
      this.notif.error(error.message);
      // loading off
      this.loadingDataStatistik = false;
      // init data
      this.dataStatistik = [];
    });
  }
}
