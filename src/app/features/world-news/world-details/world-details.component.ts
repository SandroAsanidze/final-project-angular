import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { World, WorldNews, WorldNewsService } from '../service/world-news.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-world-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[WorldNewsService],
  templateUrl: './world-details.component.html',
  styleUrls: ['./world-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldDetailsComponent implements OnInit {
  worldNews!:World;

  constructor(private router:Router,private worldService:WorldNewsService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    const route = this.router.url;
    const id = Number(route[route.length - 1]);
    this.worldService.getSingleWorldNews(id).subscribe(data => {
      this.worldNews = data;
      this.cdr.detectChanges();
    })
  }

  backToPage() {
    this.router.navigate(['world']);
  }

}