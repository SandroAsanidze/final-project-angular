import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-world-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world-news.component.html',
  styleUrls: ['./world-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldNewsComponent {


}
