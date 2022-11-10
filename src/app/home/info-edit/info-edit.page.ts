/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/dot-notation */
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-info-edit',
  templateUrl: './info-edit.page.html',
  styleUrls: ['./info-edit.page.scss'],
})
export class InfoEditPage implements OnInit {
  isLogin: boolean = false;
  updateCred: FormGroup;

  constructor(private authenticationService: AuthenticationService)
  {
    this.updateCred = new FormGroup({
      id: new FormControl(''),
      username: new FormControl('', Validators.required),
      email: new FormControl('',[
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,100}$'
        ), Validators.required])
    });
    this.authenticationService.isUserLogin().then((user)=>
    {
      if(user)
      {
        this.updateCred = new FormGroup({
          id: new FormControl(JSON.parse(user.value).uid),
          username: new FormControl(JSON.parse(user.value).username),
          email: new FormControl(JSON.parse(user.value).email,
            Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,100}$'
            ))
        });
        this.updateCred.controls['username'].setValue(JSON.parse(user.value).username);
        this.updateCred.controls['email'].setValue(JSON.parse(user.value).email);
        this.updateCred.controls['id'].setValue(JSON.parse(user.value).id);
      }
    });

   }

   update()
   {
    if(this.updateCred.invalid)
    {
      return;
    }
    console.log(this.updateCred.value)
    this.authenticationService.getListData().then((usersList)=>
    {
      const parsedArray = JSON.parse(usersList.value);
      JSON.parse(usersList.value).filter((user,index)=>
      {
        if(user.uid === this.updateCred.value.id)
        {
          console.log(user);
          console.log(index);
          parsedArray[index] = {
            "username": this.updateCred.value.username,
            "email": this.updateCred.value.email,
            "pwd": "789456123",
            "uid": user.uid
          };
          console.log(parsedArray);
          this.authenticationService.updateUserData(parsedArray);
        }
      });
    });
   }

  ngOnInit() {
  }
}
