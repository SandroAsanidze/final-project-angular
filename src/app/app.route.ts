import { Route } from "@angular/router";
import { authGuard, authGuard1 } from "./core/guards/auth.guard";

export const ROUTE:Route[] = [
    {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
    },
    {
        path:'home',
        loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
    },
    {
        path:'world',
        loadComponent: () => import('./features/world-news/world-news.component').then(c => c.WorldNewsComponent)
    },
    {
        path:'technic',
        loadComponent: () => import('./features/technics/technics.component').then(c => c.TechnicsComponent)
    },
    {
        path:'sports',
        loadComponent: () => import('./features/sports/sports.component').then(c => c.SportsComponent)
    },
    {
        path:'weather',
        loadComponent: () => import('./features/weather/weather.component').then(c => c.WeatherComponent)
    },
    {
        path:'login',
        loadComponent: () => import('./features/login/login.component').then(c => c.LoginComponent),
        canActivate:[authGuard1]
    },
    {
        path:'add-news',
        loadComponent: () => import('./features/add-news/add-news.component').then(c => c.AddNewsComponent),
        canActivate:[authGuard]
    },
];