import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { EnvService } from '../env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService, IndividualConfig } from 'ngx-toastr';



@Injectable({ providedIn: 'root' })
export class DashboardService {

  headers: any;

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService,
  ) {
    this.headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('accessToken')}`});
  }

  getFacilities() {
    return this.httpClient.get(`${this.envService.apiUrl}/facility`, {
      headers: this.headers
    });
  }

  getDevice(roomId) {
    return this.httpClient.get(`${this.envService.apiUrl}/device/${roomId}`, {
      headers: this.headers
    });
  }

  getFraunhoferDevice(id) {
    return this.httpClient.get(`${this.envService.apiUrl}/fraunhofer-device/${id}`, {
      headers: this.headers
    });
  }

}