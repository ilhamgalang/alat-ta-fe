import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// api service
import { ListApiService } from '../service/list-api.service';
import { NotifService } from '../service/notif.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSignIn: any;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private api: ListApiService,
    private fb: FormBuilder,
    private notif: NotifService,
    private spinner: NgxSpinnerService
    ) {
  }

  ngOnInit() {
    // set current path
    localStorage.setItem('cCurrentPath', 'login');

    this.isSignIn = 1;
    // login form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // register form
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      nama_user: [''],
      password: ['', Validators.required]
    });
  }

  // merubah form sign in atau sign up
  setIsSignIn(value: any) {
    this.isSignIn = value;
  }

  // proses login user
  cekLogin() {
    // spinner aktif
    this.spinner.show();
    // cek validasi apakah username dan password tidak kosong
    if (this.loginForm.value.username !== '' && this.loginForm.value.username !== null && this.loginForm.value.password !== '' && this.loginForm.value.password !== null) {
      // proses login
      this.api.cekLogin(this.loginForm.value).subscribe(response => {
        // jika berhasil login
        if (response.status == 1) {
          // membuat local storage dengan id_user
          localStorage.setItem('cIdUser', response.data[0].id_user);
          // spinner mati
          this.spinner.hide();
          // pindah halaman ke home
          this.router.navigate(['home']);
        } else { // jika gagal login
          // spinner mati
          this.spinner.hide();
          // notif gagal
          this.notif.error('Username or Password Incorrect!');
          // reset form
          this.loginForm.reset();
        }
      }, error => {
        console.log(error);
        // spinner mati
        this.spinner.hide();
        // notif error
        this.notif.error(error.message);
      });
    }else { // jika kosong
      // beri notif
      this.notif.error('Username and password can\'t empty!');
      // spinner mati
      this.spinner.hide();
    }
  }

  // proses register user
  register() {
    // spinner aktif
    this.spinner.show(); 
    // cek validasi apakah username dan password tidak kosong
    if (this.registerForm.value.username !== '' && this.registerForm.value.username !== null && this.registerForm.value.password !== '' && this.registerForm.value.password !== null) {
      // proses register
      this.api.registerUser(this.registerForm.value).subscribe(response => {
        // jika register berhasil
        if (response.status == 1) {
          // membuat local storage dengan id_user
          localStorage.setItem('cIdUser', response.data[0].id_user);
          // spinner mati
          this.spinner.hide();
          // notif success
          this.notif.success(response.message);
          // pindah halaman ke home
          this.router.navigate(['home']);
        } else { // jika gagal login
          // spinner mati
          this.spinner.hide();
          // notif gagal
          this.notif.error(response.message);
          // reset form
          this.registerForm.reset();
        }
      }, error => {
        console.log(error);
        // spinner mati
        this.spinner.hide();
        // notif error
        this.notif.error(error.message);
      });
    } else { // jika kosong
      // beri notif
      this.notif.error('Username and password can\'t empty!');
      // spinner mati
      this.spinner.hide();
    }
  }

}
