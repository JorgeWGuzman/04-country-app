import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomePage } from './shared/pages/home-page/home-page';
import countryRoutes from './country/country.routes';

export const routes: Routes = [

{
  path: '',
  component: HomePage,
},

{
  path: 'country',
  loadChildren: () => import('./country/country.routes')
},
{
    path: '**',
    redirectTo: '',
 },
];
