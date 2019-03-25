import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Profile } from '../Models/profile';
import { User } from '../Models/user';

const routes = {
  quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`
};

export interface RandomQuoteContext {
  // The quote's category: 'dev', 'explicit'...
  category: string;
}

@Injectable()
export class DataZoneService {
  constructor(private httpClient: HttpClient) {}

  result: string[];
  public GetPrifiles(): Observable<Profile[]> {
    const url = 'http://localhost:29224/api/profiles';

    return this.httpClient.get<Profile[]>(url);
  }

  public GetPrifileById(id: any): Observable<Profile> {
    const url = 'http://localhost:29224/api/profiles/' + id;

    return this.httpClient.get<Profile>(url);
  }

  public UpdatePrifile(model: any) {
    const url = 'http://localhost:29224/api/profiles/';

    return this.httpClient.post(url, model);
  }

  public GetUsers(): Observable<User[]> {
    const url = 'http://localhost:29224/api/getusers';

    return this.httpClient.get<User[]>(url);
  }
}
