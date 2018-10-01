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

  // alamat (back end)
  private api = 'https://alat-ta-be.000webhostapp.com/';

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

  // get data user by username
  getDataUser(username: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.get(this.api + 'user/getDataUser?username=' + username);
    return result;
  }

  // Tabel UserAlat
  // get Data Device by user
  getDataOwnedShared(data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'UserAlat/getDataOwnedShared', data);
    return result;
  }

  // add new device
  addOrShareDevice(data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'userAlat/create', data);
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

  // hapus status share pada suatu device
  deleteStatusShare(idAlat: string, idUser: string): Observable<any> {
    let result: Observable<Object>;
    result = this.http.get(this.api + 'UserAlat/deleteDataShared?id_alat=' + idAlat + '&&id_user=' + idUser);
    return result;
  }

  // hapus semua status share pada suatu device
  deleteStatusShareAll(id: string): Observable<any> {
    let result: Observable<Object>;
    result = this.http.get(this.api + 'UserAlat/deleteDataSharedAll?id_alat=' + id);
    return result;
  }

  // terima device yang di bagikan dengan kita
  acceptDeviceShare(data: Object): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.api + 'UserAlat/confirmShareDevice', data);
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
  updateStatusAlat(primary: string, data: Object): Observable<any> {
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

  // ubah / sembunyikan record yang lama ketika device di hapus
  updateRecordWhenDeviceDeleted(id: string): Observable<any> {
    let result: Observable<Object>;
    result = this.http.get(this.api + 'record/updateRecord?id_alat=' + id);
    return result;
  }
}
