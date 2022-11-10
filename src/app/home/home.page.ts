/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit
{
  results: any = []
  isLoading: boolean = false;
  img: any
  name: any
  dob: any
  gender: any
  email: string
  constructor(private authenticationService: AuthenticationService, private route: Router,private activeRoute: ActivatedRoute,private menu: MenuController)
  {
    this.getUserData();
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.getUserData();
    });
}


  getUserData()
  {
    this.authenticationService.getUserData().subscribe((res)=>
    {
        this.results = res['results'][0]
        this.img = this.results.picture.large
        this.name = (this.results.name.title + " " + this.results.name.first + " " + this.results.name.last)
        this.dob = this.results.dob.age
        this.gender = this.results.gender
        Storage.get({
          key: 'isUserLogin',
        }).then((val: any) =>
        {
          if(val.value)
          {
            this.email = JSON.parse(val.value).email;
            this.isLoading = true;
          }
        });
    })
  }

  logOut()
  {
    Storage.remove({
      key: 'isUserLogin'
    }).then((res: any)=>
    {
      if(!res)
      {
        this.route.navigate(['login'])
      }
    })
  }
}
