import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.staging';
import { HttpClient } from '@angular/common/http';
import { AuthDto } from '../models/auth.dto';
import { Observable } from 'rxjs';

interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = environment.apiUrl + "login";
  private http = inject(HttpClient);

  login(dto: AuthDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, dto);
  } 
}
