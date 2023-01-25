import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./main/home/home.component";
import {ConnexionComponent} from "./main/connexion/connexion.component";
import {UsagerComponent} from "./main/usager/usager/usager.component";

const routes: Routes = [
  {
    path: '', component: ConnexionComponent
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: '', component: UsagerComponent},
      {path: 'usager/:id', component: UsagerComponent},

    ]
  },
  {
    path: '404', component: ConnexionComponent
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
