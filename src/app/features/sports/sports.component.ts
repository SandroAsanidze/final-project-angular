import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SportsService } from './service/sports.service';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[SportsService],
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SportsComponent implements OnInit {
  constructor(private sportService:SportsService,public cdr:ChangeDetectorRef){}

  ngOnInit(): void {}
}
