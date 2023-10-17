import { Route } from "@angular/router";

export const ROUTE:Route[] = [
    {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
    },
    // {
    //     path:'home',
    //     loadComponent: () => import('./features/home/').then(c => c.HomeComponent)
    // },
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
];