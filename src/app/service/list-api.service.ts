import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })
  };

@Injectable({
  providedIn: 'root'
})

export class ListApiService {

  constructor(private http: HttpClient) { }

  private api = 'http://10.10.10.25:69/tugas_akhir/alat/';

	// cek data for login (user)
	cekLogin(data: Object): Observable<any> {
	    let result: Observable<Object>;
	        result = this.http.post(this.api + 'user' + '/cekLogin', data);
	    return result;
	}

}
