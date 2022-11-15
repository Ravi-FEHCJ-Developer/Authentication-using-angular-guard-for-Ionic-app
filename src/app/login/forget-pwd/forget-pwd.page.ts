/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { Storage } from '@capacitor/storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.page.html',
  styleUrls: ['./forget-pwd.page.scss'],
})
export class ForgetPwdPage implements OnInit {

  forgetPasswordCredentials: FormGroup;
  isEmail: boolean = false;
  isEmailValid: boolean = true;

  constructor(    private authenticationService: AuthenticationService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void
  {
    this.forgetPasswordCredentials = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,100}$'
        ),
      ]),
      pwd: new FormControl(''),
    });
    this.activatedRoute.queryParamMap.subscribe((params) =>
    {

    });
  }


  updatePwd()
  {
    this.authenticationService.getListData().then((verifyEmail) =>
      {
        console.log(this.forgetPasswordCredentials.value.email)
        const parsedArray = JSON.parse(verifyEmail.value);
        for(let i = 0; i< parsedArray.length; i++)
        {
          if (parsedArray[i].email !== this.forgetPasswordCredentials.value.email)
          {
            console.log('Email does not exist.');
            this.isEmail = false;
            this.isEmailValid = false;
          }
          else
          {
            console.log('Email exist.');
            this.isEmail = true;
            this.isEmailValid = true;
            break;
          }
        }
      })
  }

}
