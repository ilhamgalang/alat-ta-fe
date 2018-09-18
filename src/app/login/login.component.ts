import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// api service
import { ListApiService } from '../service/list-api.service';
import { NotifService } from '../service/notif.service';

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
    private notif: NotifService
    ) {
  }

  ngOnInit() {
    localStorage.setItem('cCurrentPath', 'login');
    this.isSignIn = 1;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // merubah form sign in atau sign up
  setIsSignIn(value: any) {
    this.isSignIn = value;
  }

  // proses login user
  cekLogin() {
    this.api.cekLogin(this.loginForm.value).subscribe(response => {
      console.log(response);
      // jika berhasil login
      if (response.status == 1) {
        // membuat local storage dengan id_user
        localStorage.setItem('cIdUser', response.data[0].id_user);
        // pindah halaman ke home
        this.router.navigate(['home']);
      } else { // jika gagal login
        // notif gagal
        this.notif.error('Username or Password Incorrect!');
        // reset form
        this.loginForm.reset();
      }
    });
  }

}
