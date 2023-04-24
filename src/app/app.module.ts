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


const appRoutes:Routes=[

  {path:'home', component: BodyComponent},
  {path:'cuotas', component:CuotasComponent},
  {path:'perfil', component:PerfilComponent}
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
    FragCerrarSesionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
