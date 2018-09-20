import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ListApiService {
  constructor(private http: HttpClient) {}

  private api = 'http://10.10.10.25:69/tugas_akhir/alat-v0.10/';

  // Tabel User
  // cek data for login (user)
  cekLogin(data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'user/cekLogin', data);
    return result;
  }

  // register
  registerUser(data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'user/create', data);
    return result;
  }

  // Tabel UserAlat
  // get Data Device by user
  getDataOwnedShared(
    id: string,
    level: string,
    primary: string
  ): Observable<any> {
    let result: Observable<Object>;
    result = this.http.get(
      this.api +
        'UserAlat/getDataOwnedShared?' +
        primary +
        '=' +
        id +
        '&level=' +
        level
    );
    return result;
  }

  // add new device
  addNewDevice(data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'userAlat/create/add', data);
    return result;
  }

  // delete device from user
  deleteDeviceFromUser(id: string): Observable<any> {
    let result: Observable<Object>;
    result = this.http.delete(this.api + 'userAlat/delete/' + id, httpOptions);
    return result;
  }

  // get data device untuk setting
  getDataDeviceSetting(data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'UserAlat/getDataDeviceSetting', data);
    return result;
  }

  // Tabel StatusAlat
  // cek data for new device
  cekAddDevice(data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'statusAlat/cekLogin', data);
    return result;
  }

  // cek data device by id
  getDataDeviceById(id: string): Observable<any> {
    let result: Observable<Object>;
    result = this.http.get(this.api + 'statusAlat/read?id_alat=' + id);
    return result;
  }

  // update on off
  updateOnOff(primary: string, data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'StatusAlat/update/' + primary, data);
    return result;
  }

  // tabel record
  // tambah record
  addRecord(data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'record/create', data);
    return result;
  }

  // get data record
  getDataRecord(data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'record/getDataRecord', data);
    return result;
  }

  // get data statistik
  getDataStatistik(data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'record/getDataStatistik', data);
    return result;
  }
}
