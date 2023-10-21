import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldNewsService, WorldNews } from '../world-news/service/world-news.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SportsService } from '../sports/service/sports.service';
import { TechnicsService } from '../technics/service/technics.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forupdate',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forupdate.component.html',
  styleUrls: ['./forupdate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForupdateComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private technicService:TechnicsService,
    private sportsService:SportsService,
    private worldService:WorldNewsService,
    private formBuilder:FormBuilder) {}
  ngOnInit(): void {}

  showForm:boolean=true;
  selectedNews!: WorldNews;

  public updateForm = this.formBuilder.group({
    title:['',Validators.required],
    description:['',Validators.required],
    urlToImage:['',[Validators.required,Validators.pattern(/https?:\/\/\S+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)/i)]],
    content:['',Validators.required],
  })

  updateNews(id:number) {
    this.selectedNews.title = this.updateForm.get('title')?.value || '';
    this.selectedNews.description = this.updateForm.get('description')?.value || '';
    this.selectedNews.urlToImage = this.updateForm.get('urlToImage')?.value || '';
    this.selectedNews.content = this.updateForm.get('content')?.value || '';

    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (currentRoute === 'sport') {
      this.sportsService.getSingleNews(id).subscribe(() => {
        this.sportsService.updateSportNews(id, this.selectedNews).subscribe();
      });
    } 
    else if (currentRoute === 'world') {
      this.worldService.getSingleWorldNews(id).subscribe(() => {
        this.worldService.updateWorldNews(id, this.selectedNews).subscribe();
      });
    }
    else if (currentRoute === 'technic') {
      this.technicService.getSingleTechnicNews(id).subscribe(() => {
        this.technicService.updateTechnicNews(id, this.selectedNews).subscribe();
      });
    }
   
    this.showForm = !this.showForm;
  }
} 
