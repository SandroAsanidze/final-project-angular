import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { WorldNewsService } from '../../features-services/world-service/world-news.service';
import { catchError, of } from 'rxjs';

export const newsResolver: ResolveFn<any> = (route, state,worldService = inject(WorldNewsService)) =>
  worldService.getWorldNews().pipe(
  catchError((err) => {
    return of('No data' + err);
  })
  )
