import { ChangeDetectionStrategy, Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule,LoginComponent],
  providers:[],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
  constructor(private router:Router,public loaderService:LoaderService){}
  ngOnInit() {
    this.Admin();
  }

  Admin() {
    if(localStorage.getItem('isAdmin') === 'true') {
      return true;
    }
    else {
      return false
    }
  }

  logOut() {
    const confirmation = confirm('Are you sure you want to exit ADMIN mode?');
    if (confirmation) {
      this.router.navigate(['home'])
      localStorage.removeItem('isAdmin');
    }
  }

  today : Date = new Date();
}
