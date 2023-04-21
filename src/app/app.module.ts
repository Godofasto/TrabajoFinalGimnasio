import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent} from './body/body.component';
import { CuotasComponent } from './cuotas/cuotas.component';
import { RouterModule, Routes} from '@angular/router';

const appRoutes:Routes=[

  {path:'home', component: BodyComponent},
  {path:'cuotas', component:CuotasComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    CuotasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
