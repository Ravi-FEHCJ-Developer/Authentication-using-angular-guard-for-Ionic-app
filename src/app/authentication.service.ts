/* eslint-disable arrow-body-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/Preferences';
import { HttpClient } from '@angular/common/http';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthenticationService
{
  arr: any = [];

  constructor(private http: HttpClient)
  {
  }

  getUserData()
  {
    return this.http.get('https://randomuser.me/api/');
  }


  storeRegCred(obj)
  {
    Preferences.get({
      key: 'authData',
    }).then((v)=>
    {
      if(v.value)
      {
        this.arr = JSON.parse(v.value);
      }
      this.arr.push(obj);
      Preferences.set({
        key: 'authData',
        value: JSON.stringify(this.arr),
      });
    });
  }

  isUserLogin()
  {
    return Preferences.get({
      key: 'isUserLogin',
    });
  }

  getListData()
  {
    return Preferences.get({
      key: 'authData'
    });
  }

  updateUserData(list)
  {
    Preferences.get({
      key: 'authData',
    }).then((v)=>
    {
      if(v.value)
      {
        Preferences.set({
          key: 'authData',
          value: JSON.stringify(list),
        });
      }
    });
  }

  getPwd()
  {
    return Preferences.get({
      key: 'password'
    });
  }

  getIsRememberMe()
  {
    return Preferences.get({
      key: 'IsRememberMe'
    });
  }
}
