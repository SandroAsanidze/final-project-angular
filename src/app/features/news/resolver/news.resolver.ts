import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { WorldNewsService } from 'src/app/shared/features-services/world-service/world-news.service';

export const newsResolver: ResolveFn<any> = (route, state,worldService = inject(WorldNewsService)) =>
  worldService.getWorldNews().pipe(
  catchError((err) => {
    return of('No data' + err);
  })
  )
