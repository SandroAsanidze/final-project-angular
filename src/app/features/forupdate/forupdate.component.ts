import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticleDataService } from 'src/app/core/services/article-data.service';
import { TechnicsService } from 'src/app/shared/features-services/technic-service/technics.service';
import { SportService } from 'src/app/shared/features-services/sport-service/sport.service';
import { WorldNewsService } from 'src/app/shared/features-services/world-service/world-news.service';

@Component({
  selector: 'app-forupdate',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './forupdate.component.html',
  styleUrls: ['./forupdate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForupdateComponent implements OnInit {
  constructor(
    private articleDataService: ArticleDataService,
    private route: ActivatedRoute,
    private technicService:TechnicsService,
    private sportsService:SportService,
    private worldService:WorldNewsService,
    private formBuilder:FormBuilder) {}
    
    ngOnInit(): void {
      this.selectedNews = this.articleDataService.getSelectedArticle();
    }

  selectedNews:any;

  public updateForm = this.formBuilder.group({
    title:[`${this.articleDataService.getSelectedArticle()?.title}`,Validators.required],
    description:[`${this.articleDataService.getSelectedArticle()?.description}` ,Validators.required],
    urlToImage:[`${this.articleDataService.getSelectedArticle()?.urlToImage}`,[Validators.required,Validators.pattern(/https?:\/\/\S+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)/i)]],
    content:[`${this.articleDataService.getSelectedArticle()?.content}`,Validators.required],
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
    
    this.articleDataService.changeShowForm(!this.articleDataService.showForm);
  }

  cancelButton(){
    this.articleDataService.changeShowForm(!this.articleDataService.showForm);
  }
} 
