import {Component} from '@angular/core';
import {AuthConfig, NullValidationHandler, OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'backofficep4';

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/backendp4/protocol/openid-connect/token',
    redirectUri: window.location.origin,
    clientId: 'backofficep4',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };


  configure(): void {
   /* this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(()=>this.oauthService.tryLogin());*/
      /*.then(()=>{
        if (this.oauthService.getIdentityClaims()){*/
/*
          this.isAdmin();
*/
     //   }
    //  })
  }
  public isLogged():boolean{
    return (this.oauthService.hasValidAccessToken());
  }
/*public isAdmin():void{
    const token =this.oauthService.getAccessToken();
    const payload= token.split('.')[1];
    const payloadDecodeJson=atob(payload);
    const payloadDecoded=JSON.parse(payloadDecodeJson);
    console.log(payloadDecoded);
}*/
}
