import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const data = {
      username: username,
      password: password
    };
    return this.http.post(url, data, this.httpOptions);
  }
}
