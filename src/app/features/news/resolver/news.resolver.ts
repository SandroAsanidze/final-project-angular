import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { SportService } from 'src/app/shared/features-services/sport-service/sport.service';
import { TechnicsService } from 'src/app/shared/features-services/technic-service/technics.service';
import { WorldNewsService } from 'src/app/shared/features-services/world-service/world-news.service';

export const newsResolver: ResolveFn<any> = (route, state) => {

  console.log(route.routeConfig?.path);
  const currentPath = route.routeConfig?.path;
  
  if(currentPath === 'world') {
    const worldService = inject(WorldNewsService)
    return worldService.getWorldNews().pipe(catchError((err) => {
      return of('No data' + err);
    })
    )
  } 
  else if (currentPath === 'sport') {
    const sportService = inject(SportService);
    return sportService.getSportsNews().pipe(catchError((err) => {
      return of('No data' + err);
    })
    )
  }
  else {
    const technicService = inject(TechnicsService);
    return technicService.getNews().pipe(catchError((err) => {
      return of('No data' + err);
    })
    )
  }

}
