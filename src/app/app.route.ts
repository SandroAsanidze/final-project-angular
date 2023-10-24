import { Route } from "@angular/router";
import { authGuard, authGuard1 } from "./core/guards/auth.guard";
import { weatherResolver } from "./features/weather/resolver/weather.resolver";

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
        loadComponent: () => import('./features/news/news.component').then(c => c.NewsComponent)
    },
    {
        path:'world/:id',
        loadComponent: () => import('./features/news/single-news/single-news.component').then(c => c.SingleNewsComponent)
    },
    {
        path:'technology',
        loadComponent: () => import('./features/news/news.component').then(c => c.NewsComponent)
    },
    {
        path:'technology/:id',
        loadComponent: () => import('./features/news/single-news/single-news.component').then(c => c.SingleNewsComponent)
    },
    {
        path:'sport',
        loadComponent: () => import('./features/news/news.component').then(c => c.NewsComponent),
    },
    {
        path:'sport/:id',
        loadComponent: () => import('./features/news/single-news/single-news.component').then(c => c.SingleNewsComponent)
    },
    {
        path:'weather',
        loadComponent: () => import('./features/weather/weather.component').then(c => c.WeatherComponent),
        resolve:{
            routeResolver:weatherResolver
        }
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