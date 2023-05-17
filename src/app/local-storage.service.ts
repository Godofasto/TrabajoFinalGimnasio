import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private USERNAME_KEY = 'username';
  private PASSWORD_KEY ='password';

  get username(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  set username(value: string | null){
    if(value){
      localStorage.setItem(this.USERNAME_KEY, value);
    }else{
      localStorage.removeItem(this.USERNAME_KEY); //eSTO POR QUE?
    }
  }
  get password(): string | null {
    return localStorage.getItem(this.PASSWORD_KEY);
  }

  set password(value: string | null) {
    if (value) {
      localStorage.setItem(this.PASSWORD_KEY, value);
    } else {
      localStorage.removeItem(this.PASSWORD_KEY);
    }
  }
}
