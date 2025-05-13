import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageComponent } from './components/language/language.component';
import { HomeComponent } from './components/home/home.component';
import { SignalrfrontendComponent } from './signalrfrontend/signalrfrontend.component';
import { SignalTokenComponent } from './signal-token/signal-token.component';
const routes: Routes = [
  {
    path: 'Home/:id', component: SignalrfrontendComponent,
  },
  {
    path: 'Homes', component: SignalrfrontendComponent,
  },
  {
    path: 'Home', component: SignalrfrontendComponent,
  },
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'signalToken', component:SignalTokenComponent ,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{}

