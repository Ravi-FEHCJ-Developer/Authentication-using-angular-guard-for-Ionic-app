/* eslint-disable arrow-body-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
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
    Storage.get({
      key: 'authData',
    }).then((v)=>
    {
      if(v.value)
      {
        this.arr = JSON.parse(v.value);
      }
      this.arr.push(obj);
      Storage.set({
        key: 'authData',
        value: JSON.stringify(this.arr),
      });
    });
  }

  isUserLogin()
  {
    return Storage.get({
      key: 'isUserLogin',
    });
  }

  getListData()
  {
    return Storage.get({
      key: 'authData'
    });
  }

  updateUserData(list)
  {
    Storage.get({
      key: 'authData',
    }).then((v)=>
    {
      if(v.value)
      {
        Storage.set({
          key: 'authData',
          value: JSON.stringify(list),
        });
      }
    });
  }

  getPwd()
  {
    return Storage.get({
      key: 'password'
    });
  }

  getIsRememberMe()
  {
    return Storage.get({
      key: 'IsRememberMe'
    });
  }
}
