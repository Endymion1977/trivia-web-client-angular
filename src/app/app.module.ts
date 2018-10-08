import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';

const oktaConfig = {
  issuer: 'https://dev-354685.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oagk0vssioRGOgqI0h7'
};

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'trivia', component: TriviaGameComponent },
    { path: 'implicit/callback', component: OktaCallbackComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TriviaGameComponent } from './trivia-game/trivia-game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TriviaGameComponent
  ],
  imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      OktaAuthModule.initAuth(oktaConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
