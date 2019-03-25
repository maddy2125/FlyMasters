import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Profile } from '../Models/profile';
import { User } from '../Models/user';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  result: string[];
  public GetUsers(): Observable<User> {
    const url = 'http://localhost:29224/api/userlogin';
    var res = this.httpClient.get<User>(url);
    return res;
  }
}
