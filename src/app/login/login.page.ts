/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as forms from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Preferences } from '@capacitor/Preferences';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';

import { ActionSheetController } from '@ionic/angular';
import { inject } from '@angular/core/testing';

import { LanguagesService } from '../services/languages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  regCredentials: forms.FormGroup;

  isLogin: boolean = true;
  parsedArray: any = [];
  repwd: any;
  checkboxValue: any = 'No';
  password: any = 'No';
  checkboxStatus: any = false;

  // popover
  @ViewChild('popover') popover;
  isOpen = false;


  constructor(
    private authenticationService: AuthenticationService,
    @Inject(Router) private route,
    @Inject(ActivatedRoute) private activatedRoute,
    public popoverController: PopoverController,private actionSheetCtrl: ActionSheetController,
    public renderer: Renderer2,
    public languagesService: LanguagesService,
  ) {}

  ngOnInit(): void
  {
    this.regCredentials = new forms.FormGroup({
      username: new forms.FormControl(''),
      email: new forms.FormControl('', [
        forms.Validators.required,
        forms.Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,100}$'
        ),
      ]),
      pwd: new forms.FormControl('', [forms.Validators.required, forms.Validators.minLength(8)]),
    });
    this.activatedRoute.queryParamMap.subscribe((params) =>
    {
      this.isLogin = true;
      this.authenticationService.isUserLogin().then(getEmail =>
        {
          this.authenticationService.getIsRememberMe().then((rememberMeChecked) =>
          {
            if(rememberMeChecked.value === 'yes')
            {
              console.log("yes")
              if(getEmail.value)
              {
                console.log(getEmail)
                this.authenticationService.getPwd().then(getPwd=>
                  {
                    if(getPwd.value)
                    {
                      this.regCredentials.patchValue({
                        email: JSON.parse(getEmail.value).email,
                        pwd: getPwd.value
                      });
                    }
                  })
              }

              this.checkboxStatus = true;
            }
            else if(rememberMeChecked.value === 'no')
            {
              console.log("no")
              this.checkboxStatus = false;
            }
          })
        })
    });
  }


  presentPopover(e: Event)
  {
    this.popover.event = e;
    this.isOpen = true;
  }

  closePopover()
  {
    this.popoverController.dismiss();
  }

  switchRegLogin() {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.regCredentials.get('username').clearValidators();
      this.regCredentials.get('username').updateValueAndValidity();
    } else {
      this.regCredentials.get('username').setValidators([forms.Validators.required]);
      this.regCredentials.get('username').updateValueAndValidity();
    }
  }

  authenticate(value) {
    if (this.regCredentials.invalid) {
      return null;
    }
    if (value === 'signup') {
      Preferences.get({
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
      Preferences.get({
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
    Preferences.set({
      key: 'isUserLogin',
      value: JSON.stringify(obj),
    });
  }

  checkboxes(flag)
  {
    if (flag.detail.checked)
    {
      this.checkboxValue = 'yes'
      Preferences.set({
        key: 'password',
        value: this.regCredentials.value.pwd
      });
    }
    else
    {
      this.checkboxValue = 'no'
      Preferences.set({
        key: 'password',
        value: ''
      });
    }
    Preferences.set({
      key: 'IsRememberMe',
      value: this.checkboxValue
    });
  }


  // Theme Change action sheet
  result: string;

  async changeThemeActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose Theme',
      cssClass: 'actionSheetText',
      buttons: [
        {
          text: 'green',
          role: 'destructive',
          handler: () => {
            this.changeColor('green')
          }
        },
        {
          text: 'Blue',
          handler: () => {
            this.changeColor('blue')
          }
        },
        {
          text: 'Default',
          handler: () => {
            this.changeColor('default')
          }
        },
      ],
    });

    this.closePopover();
    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  }

  changeColor(color)
  {
    this.renderer.setAttribute(document.body , 'color-theme' , color)
  }


  async changeLangActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose Language',
      cssClass: 'actionSheetText',
      buttons: [
        {
          text: 'English',
          handler: () => {
            this.languagesService.setLanguage('en')
          }
        },
        // {
        //   text: 'Spanish',
        //   handler: () => {
        //     this.languagesService.setLanguage('en')
        //   }
        // },
        {
          text: 'German',
          handler: () => {
            this.languagesService.setLanguage('de')
          }
        },
      ],
    });

    this.closePopover();
    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  }
}
