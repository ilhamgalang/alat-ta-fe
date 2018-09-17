import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.isSignIn = 1;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  setIsSignIn(value: any) {
    this.isSignIn = value;
  }

}
