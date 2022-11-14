/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate : any;
  constructor(private route: Router)
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Info Edit",
        url   : "home/infoedit",
        icon  : "create"
      },
      {
        title : "Projects Lists",
        url   : "home/projectslist",
        icon  : "call-sharp"
      },
      {
        title : "Logout",
        url   : "/login",
        icon  : "log-out-outline",
        logout: 'logout'
      },
    ]
  }
  logOut(notation: string)
  {
    if(notation === 'logout')
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
}

