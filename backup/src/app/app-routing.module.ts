import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { IgvComponent } from './components/igv/igv.component';
import { MapsComponent } from './components/maps/maps.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { GoComponent } from './components/go/go.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Public route
  { path: 'login', component: LoginComponent },
  
  // Protected routes
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'go', component: GoComponent, canActivate: [AuthGuard] },
  { path: 'igv', component: IgvComponent, canActivate: [AuthGuard] },
  { path: 'maps', component: MapsComponent, canActivate: [AuthGuard] },
  { path: 'documentation', component: DocumentationComponent, canActivate: [AuthGuard] },
  
  // Default and wildcard routes now redirect to '/home'
  // If the user is not logged in, your AuthGuard should handle the redirection to '/login'
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  SearchComponent,
  GoComponent,
  IgvComponent,
  MapsComponent,
  DocumentationComponent,
  LoginComponent
];
