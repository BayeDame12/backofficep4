import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './main/home/home.component';
import {HeaderComponent} from './main/header/header.component';
import {NotFoundPageComponent} from './main/not-found-page/not-found-page.component';
import {ConnexionComponent} from './main/connexion/connexion.component';
import {UsagerComponent} from "./main/usager/usager/usager.component";
import {HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap/modal";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundPageComponent,
    ConnexionComponent,
    UsagerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    ModalModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8090/api/*'],
        sendAccessToken: true
      }
    }),
    FormsModule
  ],
  providers: [
    //{provide:APP_INITIALIZER,deps:[KeycloakSecurityServiceService],useFactory:kcFactory,multi:true},
    // {multi: true, provide: HTTP_INTERCEPTORS, useClass: [KeycloakHttpInterceptorService]}
  ]
})
export class AppModule {
}
