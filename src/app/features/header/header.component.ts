import { ChangeDetectionStrategy, Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule,LoginComponent],
  providers:[AuthService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
  constructor(public auth:AuthService,private router:Router){}
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
      this.router.navigate(['technic'])
      localStorage.removeItem('isAdmin');
    }
  }

  today : Date = new Date();
}
