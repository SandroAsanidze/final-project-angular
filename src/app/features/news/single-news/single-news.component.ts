import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WorldNewsService } from '../../features-services/world-service/world-news.service';
import { CommonInterface } from '../../add-news/add-news.component';
import { TechnicsService } from '../../features-services/technic-service/technics.service';
import { SportService } from '../../features-services/sport-service/sport.service';

@Component({
  selector: 'app-single-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleNewsComponent {
  singleNews!:CommonInterface;

  constructor(
    private router:Router,
    private worldService:WorldNewsService,
    private technicService:TechnicsService,
    private sportService:SportService,
    private cdr:ChangeDetectorRef
  ){}
  currentPath:string|undefined;
  ngOnInit(): void {
    const route = this.router.url;
    const segments = route.split('/');
    const id = Number(segments[segments.length - 1]);
    this.currentPath = segments[1];
    
    if(segments[1] === 'world') {
      this.worldService.getSingleWorldNews(id).subscribe(data => {
        this.singleNews = data;
        this.cdr.detectChanges();
      })
    }

    if(segments[1] === 'sport') {
      this.sportService.getSingleNews(id).subscribe(data => {
        this.singleNews = data;
        this.cdr.detectChanges();
      })
    }

    if(segments[1] === 'technology') {
      this.technicService.getSingleTechnicNews(id).subscribe(data => {
        this.singleNews = data;
        this.cdr.detectChanges();
      })
    }
    
  }

  backToPage() {
    this.router.navigate([this.currentPath]);
  }
}
