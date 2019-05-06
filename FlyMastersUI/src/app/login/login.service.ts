import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Profile } from '../Models/profile';
import { User } from '../Models/user';
import { environment } from '@env/environment';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  result: string[];
  apiUrl: string = environment.serverUrl;
  //apiUrl: string = 'http://localhost:29224/api';

  public GetUsers(): Observable<User> {
    console.log(this.apiUrl);
    const url = this.apiUrl + '/userlogin';
    var res = this.httpClient.get<User>(url);
    return res;
  }
}
