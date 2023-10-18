import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  providers:[LoginService,AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(private router:Router,private formBuilder:FormBuilder, public loginService:LoginService,public auth:AuthService){}
  ngOnInit(): void {
    this.getEmail();
    this.getPassword();
  }

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  warningMessage: string = '';

  Submit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email === this.email && password === this.password) {
      localStorage.setItem('isAdmin','true');
      this.router.navigate(['add-news']);
    }
    else {
      this.warningMessage = 'Invalid email or password.';
    }
  }

  public email: string='';
  public password: string='';

  public getEmail() {
    this.loginService.getInfo().subscribe(data => {
      this.email = data.email;
    });
  }

  public getPassword() {
    this.loginService.getInfo().subscribe(data => {
      this.password = data.password;
    });
  }
}
