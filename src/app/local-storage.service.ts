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
      localStorage.setItem('isLoggedIn', 'true');
    }else{
      localStorage.removeItem(this.USERNAME_KEY); //Esto por que?
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
  get apunta(): boolean | null {
    return localStorage.getItem("isLoggedIn") == "true";
  }

  set apunta(value: boolean | null){
    if(value){
      localStorage.setItem('isLoggedIn', 'true');
    }else{
      localStorage.setItem('isLoggedIn', 'false'); //Esto por que?
    }
  }
  isLoggedIn() : boolean{
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  logout(){
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem('isLoggedIn');
  }
}
