import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Technics, TechnicsService } from '../service/technics.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-technic-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[TechnicsService],
  templateUrl: './technic-details.component.html',
  styleUrls: ['./technic-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicDetailsComponent implements OnInit {
  technicNews!:Technics;

  constructor(private router:Router,private technicService:TechnicsService,private cdr:ChangeDetectorRef){}

  ngOnInit(): void {
    const route = this.router.url;
    const segments = route.split('/');
    const id = Number(segments[segments.length - 1]);

    this.technicService.getSingleTechnicNews(id).subscribe(data => {
      this.technicNews = data;
      this.cdr.detectChanges();
    })
  }

  backToPage() {
    this.router.navigate(['technic']);
  }

}
