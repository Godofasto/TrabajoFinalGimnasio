import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent} from './body/body.component';
import { CuotasComponent } from './cuotas/cuotas.component';
import { RouterModule, Routes} from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { FooterComponent } from './footer/footer.component';
import { FragMisDatosComponent } from './frag-mis-datos/frag-mis-datos.component';
import { FragMisCitasComponent } from './frag-mis-citas/frag-mis-citas.component';
import { FragMisTablasComponent } from './frag-mis-tablas/frag-mis-tablas.component';
import { FragCerrarSesionComponent } from './frag-cerrar-sesion/frag-cerrar-sesion.component';
import { GuardaPerfilGuard } from './guarda-perfil.guard';
import { RegistroComponent } from './registro/registro.component';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HttpClientModule } from '@angular/common/http';
import { InsertarProductosComponent } from './insertar-productos/insertar-productos.component'; // Importar HttpClientModule
import {FormsModule} from '@angular/forms';
import { EntrenadoresComponent } from './entrenadores/entrenadores.component';



const appRoutes:Routes=[

  {path:'', component: BodyComponent},
  {path:'catalogo', component: CatalogoComponent},
  {path:'cuotas', component:CuotasComponent},
  {path:'perfil', component:PerfilComponent, canActivate: [GuardaPerfilGuard]},
  {path:'registro', component:RegistroComponent},
  {path:'entrenadores', component:EntrenadoresComponent},
  {path:'iniciosesion', component:IniciosesionComponent} //Cuando se vaya a acceder 
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    CuotasComponent,
    PerfilComponent,
    FooterComponent,
    FragMisDatosComponent,
    FragMisCitasComponent,
    FragMisTablasComponent,
    FragCerrarSesionComponent,
    RegistroComponent,
    IniciosesionComponent,
    CatalogoComponent,
    InsertarProductosComponent,
    EntrenadoresComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
