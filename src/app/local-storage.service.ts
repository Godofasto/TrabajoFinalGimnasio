import { Injectable } from '@angular/core';
import { SubirUsuarioService } from './subir-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private USERNAME_KEY = 'username';
  private PASSWORD_KEY ='password';
  private EMAIL_KEY = 'email';
  private TLF_KEY = 'tlf';
  private SEXO_KEY = 'sexo';
  constructor(private subirUsuarioService : SubirUsuarioService){}
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

  get email(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  set email(value: string | null){
    if(value){
      localStorage.setItem(this.EMAIL_KEY, value);
    }else{
      localStorage.removeItem(this.EMAIL_KEY); //Esto por que?
    }
  }

  get tlf(): string | null {
    return localStorage.getItem(this.TLF_KEY);
  }

  set tlf(value: string | null){
    if(value){
      localStorage.setItem(this.TLF_KEY, value);
    }else{
      localStorage.removeItem(this.TLF_KEY); //Esto por que?
    }
  }

  get sexo(): string | null {
    return localStorage.getItem(this.SEXO_KEY);
  }

  set sexo(value: string | null){
    if(value){
      localStorage.setItem(this.SEXO_KEY, value);
    }else{
      localStorage.removeItem(this.SEXO_KEY); //Esto por que?
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
  // pillarIdUsuario(){
  //   this.subirUsuarioService.retornarUsuarios
  // }
  }
