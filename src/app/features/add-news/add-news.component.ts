import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewsComponent {

}
