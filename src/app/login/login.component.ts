import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  isLoading: boolean = false;
  error: boolean;

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  removeError() {
    this.error = false;
  }

  login() {
    const {username, password} = this.profileForm.value;
    this.isLoading = true;
    this.httpClient.post(`${this.envService.apiUrl}/auth` , {
      username,
      password
    }).subscribe(res => {
      this.removeError();
      this.isLoading = false;

      localStorage.setItem('accessToken', (res as any).access_token);
      this.router.navigate(['/dashboard']);
    }, err => {
      this.error = true;
      this.isLoading = false;
    });
  }

}
