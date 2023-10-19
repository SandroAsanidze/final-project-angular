import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsService } from '../sports/service/sports.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Technics, TechnicsService } from '../technics/service/technics.service';
import { WorlNewsService, World, WorldNews } from '../world-news/service/world-news.service';

export interface Sport {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
}

@Component({
  selector: 'app-add-news',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  providers:[SportsService,TechnicsService,WorlNewsService],
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewsComponent {
  constructor(private worldService:WorlNewsService,
    private sportsService:SportsService,
    private technicsService:TechnicsService,
    private formBuilder:FormBuilder){}

  //Sports
  sportsSubmit(){
    const formData:Sport = { 
      title: this.loginForm.get('title')?.value || '',
      description: this.loginForm.get('description')?.value || '',
      urlToImage: this.loginForm.get('urlToImage')?.value || '',
      content: this.loginForm.get('content')?.value || ''
    };
    this.addSportsNews(formData);

    this.loginForm.reset();
  }

  public addSportsNews(news:Sport) {
    this.sportsService.addNews(news).subscribe();
  }

  //Technics
  technicsSubmit(){
    const formData:Technics = { 
      title: this.loginForm.get('title')?.value || '',
      description: this.loginForm.get('description')?.value || '',
      urlToImage: this.loginForm.get('urlToImage')?.value || '',
      content: this.loginForm.get('content')?.value || ''
    };
    this.addTechnicsNews(formData);

    this.loginForm.reset();
  }

  public addTechnicsNews(news:Sport) {
    this.technicsService.addTechnicNews(news).subscribe();
  }

  //Worlds
  worldsSubmit(){
    const formData:World = { 
      title: this.loginForm.get('title')?.value || '',
      description: this.loginForm.get('description')?.value || '',
      urlToImage: this.loginForm.get('urlToImage')?.value || '',
      content: this.loginForm.get('content')?.value || ''
    };
    this.addWorldsNews(formData);

    this.loginForm.reset();
  }

  public addWorldsNews(news:World) {
    this.worldService.addWorldNews(news).subscribe();
  }

  public loginForm = this.formBuilder.group({
    title:['',Validators.required],
    description:['',Validators.required],
    urlToImage:['',Validators.required],
    content:['',Validators.required],
  });


  showSport:boolean = false;
  showTechnics:boolean = false;
  showWorld:boolean = false;

  showSportBtn() {
    this.showSport = !this.showSport;
  }

  showTechnicsBtn() {
    this.showTechnics = !this.showTechnics;
  }

  showWorldBtn() {
    this.showWorld = !this.showWorld;
  }


}
