/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  parsedArray: any;
  flag: boolean = false;

  constructor(
    private route: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): any {
    Preferences.get({
      key: 'authData',
    }).then((v) => {
      this.parsedArray = JSON.parse(v.value);
      Preferences.get({
        key: 'isUserLogin',
      }).then((val: any) => {
        if(val.value)
        {
          this.parsedArray.filter((user) =>
          {
            if(user.uid === JSON.parse(val.value).id) {
              this.flag = true;
              return true;
            }
          });
          if(this.flag !== true)
          {
            this.route.navigate(['login']);
            return false;
          }
        }
        else
        {
          this.route.navigate(['login']);
          return false;
        }
      });
    });
  }
}
