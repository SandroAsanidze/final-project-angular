import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  providers:[LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(public router:Router,private formBuilder:FormBuilder, public loginService:LoginService){}
  ngOnInit(): void {
    this.getEmail();
    this.getPassword();
  }

  public loginForm = this.formBuilder.group({
    email:['',[Validators.required]],
    password:['',Validators.required]
  })

  email:string='';
  password:string='';

  public getEmail() {
    this.loginService.getInfo().subscribe(data => {
      this.email = data.email;
    })
  }

  public getPassword() {
    this.loginService.getInfo().subscribe(data => {
      this.password = data.password.toString();
    })
  }

  public isAdmin(): boolean {
    const formData = this.loginForm.value;
    const adminInfo = {
      email: this.email,
      password: this.password,
    };

    return formData.email !== adminInfo.email || formData.password !== adminInfo.password;
  }

  public Submit() {
    this.router.navigate(['add-news']);
  }
}
