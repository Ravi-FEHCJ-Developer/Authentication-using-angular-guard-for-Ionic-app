/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Storage } from '@capacitor/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  regCredentials: FormGroup;
  isLogin: boolean = true;
  parsedArray: any = [];
  repwd: any;
  checkboxValue: any = 'No';
  constructor(
    private authenticationService: AuthenticationService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.regCredentials = new FormGroup({
      username: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,100}$'
        ),
      ]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.isLogin = true;
    });
  }

  switchRegLogin() {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.regCredentials.get('username').clearValidators();
      this.regCredentials.get('username').updateValueAndValidity();
    } else {
      this.regCredentials.get('username').setValidators([Validators.required]);
      this.regCredentials.get('username').updateValueAndValidity();
    }
  }

  authenticate(value) {
    if (this.regCredentials.invalid) {
      return null;
    }
    if (value === 'signup') {
      Storage.get({
        key: 'authData',
      }).then((res) => {
        this.parsedArray = JSON.parse(res.value);
        if (!res.value) {
          this.regCredentials.value['uid'] = 1;
          this.authenticationService.storeRegCred(this.regCredentials.value);
          this.regCredentials.reset();
          this.isLogin = false;
        } else {
          this.regCredentials.value['uid'] = this.parsedArray.length + 1;
          this.authenticationService.storeRegCred(this.regCredentials.value);
          this.regCredentials.reset();
          this.isLogin = false;
        }
      });
    } else if (value === 'login') {
      const email = this.regCredentials.value.email;
      const pwd = this.regCredentials.value.pwd;
      Storage.get({
        key: 'authData',
      }).then((v) => {
        if (v.value) {
          const parsedArray = JSON.parse(v.value);
          parsedArray.filter((user) => {
            if (user.email === email && user.pwd === pwd) {
              this.isUserLogin(user.uid, user.email, user.username);
              this.regCredentials.reset();
              this.route.navigate(['home']);
            } else {
              console.log('email or password can be wrong.');
            }
          });
        } else {
          console.log('User Does not Exist.');
        }
      });
    }
  }

  isUserLogin(id, email, username) {
    const obj = {
      id,
      email,
      username,
    };
    Storage.set({
      key: 'isUserLogin',
      value: JSON.stringify(obj),
    });
  }

  checkboxes(flag)
  {

    if (flag.detail.checked)
    {
      this.checkboxValue = 'Yes'
    }
    else
    {
      this.checkboxValue = 'No'
    }
    Storage.set({
      key: 'IsRememberMe',
      value: this.checkboxValue
    });
  }
}
