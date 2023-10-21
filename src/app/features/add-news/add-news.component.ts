import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsService } from '../sports/service/sports.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TechnicsService } from '../technics/service/technics.service';
import { WorldNewsService, World, WorldNews } from '../world-news/service/world-news.service';

export interface Sport {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
}

export interface CommonInterface {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
}

@Component({
  selector: 'app-add-news',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  providers:[SportsService,TechnicsService,WorldNewsService],
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewsComponent {
  constructor(private worldService:WorldNewsService,
    private sportsService:SportsService,
    private technicsService:TechnicsService,
    private formBuilder:FormBuilder){}

  public addSportsNews(news:Sport) {
    this.sportsService.addNews(news).subscribe();
  }

  public addTechnicsNews(news:Sport) {
    this.technicsService.addTechnicNews(news).subscribe();
  }

  public addWorldsNews(news:World) {
    this.worldService.addWorldNews(news).subscribe();
  }

  public loginForm = this.formBuilder.group({
    category:['sports',Validators.required],
    title:['',Validators.required],
    description:['',Validators.required],
    urlToImage:['',[Validators.required,Validators.pattern(/https?:\/\/\S+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)/i)]],
    content:['',Validators.required],
  });

  resetForm() {
    this.loginForm.reset();
  }

  onSubmit() {
    const category = this.loginForm.get('category')?.value;
    const formData:CommonInterface = { 
      title: this.loginForm.get('title')?.value || '',
      description: this.loginForm.get('description')?.value || '',
      urlToImage: this.loginForm.get('urlToImage')?.value || '',
      content: this.loginForm.get('content')?.value || ''
    };

    if(category === 'sports') {
      this.addSportsNews(formData);
    }
    else if (category === 'worlds') {
      this.addWorldsNews(formData);
    }
    else {
      this.addTechnicsNews(formData);
    }

    this.loginForm.reset();
  }
}