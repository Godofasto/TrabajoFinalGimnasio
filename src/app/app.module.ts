import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent} from './body/body.component';
import { CuotasComponent } from './cuotas/cuotas.component';
import { RouterModule, Routes} from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { FooterComponent } from './footer/footer.component';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
