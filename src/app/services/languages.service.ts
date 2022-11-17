/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/semi */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Preferences } from '@capacitor/preferences';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService
{
  selected = '';

  constructor(private translate: TranslateService) { }

  setInitialAppLanguage()
  {
    console.log("hjasgdhj")
    const language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    console.log(language)

    Preferences.get({
      key: LNG_KEY
    }).then((value)=>
    {
      if(value.value !== 'null')
      {
        console.log(value.value)
        this.setLanguage(value.value);
        this.selected = value.value;
      }
    })
  }

  setLanguage(lng)
  {
    lng = lng
    this.translate.use(lng);
    this.selected = lng
    Preferences.set({
      key: LNG_KEY,
      value: lng
    })
  }

  // getLanguage()
  // {
  //   return
  //   [
  //     { text: 'English', value: 'en', img: 'assets/langImgs/en.png'},
  //     { text: 'German', value: 'de', img: 'assets/langImgs//de.png'},
  //   ]
  // }

}
