import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Profile } from '../Models/profile';
import { User } from '../Models/user';
import { Source } from '../Models/source';
import { AuthenticationService } from '@app/core';

const routes = {
  quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`
};

export interface RandomQuoteContext {
  // The quote's category: 'dev', 'explicit'...
  category: string;
}

@Injectable()
export class DataZoneService {
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  result: string[];
  public GetProfiles(): Observable<Profile[]> {
    const url = 'http://localhost:29224/api/profiles';
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('userId', this.authenticationService.credentials.UserId.toString());
    Params = Params.append('isAdmin', this.authenticationService.credentials.IsAdmin ? 'Yes' : 'No');
    return this.httpClient.get<Profile[]>(url, { params: Params });
  }

  public GetProfileById(id: any): Observable<Profile> {
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

  public GetSource(): Observable<Source[]> {
    const url = 'http://localhost:29224/api/getsource';

    return this.httpClient.get<Source[]>(url);
  }

  public AssignProfile(model: any) {
    const url = 'http://localhost:29224/api/AssignProfiles';

    return this.httpClient.post(url, model);
  }
}
