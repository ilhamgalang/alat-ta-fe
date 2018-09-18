import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'alat-ta-fe';
  constructor(
	private router: Router
	) {
  }
  ngOnInit() {
    if (typeof(Storage) !== undefined) {
	  localStorage.clear();
      console.log('Code for localStorage/sessionStorage.');
      // cek apakah sebelumnya user pernah login
      if (localStorage.getItem('cIdUser') !== null) { // jika ya
      	// alihkan kehalaman yang terakhir di akses
      	console.log(localStorage.getItem('cCurrentPath'));
        this.router.navigate([localStorage.getItem('cCurrentPath')]);
      } else {
      	// alihkan kehalaman login
        this.router.navigate(['login']);
      }
    } else {
      console.log('Sorry! No Web Storage support..');
    }
 }
}
