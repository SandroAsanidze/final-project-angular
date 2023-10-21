import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sport } from '../../add-news/add-news.component';
import { Router } from '@angular/router';
import { SportsService } from '../service/sports.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sport-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[SportsService],
  templateUrl: './sport-details.component.html',
  styleUrls: ['./sport-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SportDetailsComponent implements OnInit {
  sportNews!:Sport;

  constructor(private router:Router,private sportService:SportsService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    const route = this.router.url;
    const segments = route.split('/');
    
    const id = Number(segments[segments.length - 1]);
    
    this.sportService.getSingleNews(id).subscribe(data => {
      this.sportNews = data;
      this.cdr.detectChanges();
    })
  }

  backToPage() {
    this.router.navigate(['sports']);
  }
}
