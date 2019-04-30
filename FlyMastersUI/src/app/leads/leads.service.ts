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
export class LeadsZoneService {
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  result: string[];
  public loadLeadProfiles(): Observable<Profile[]> {
    const url = 'http://localhost:29224/api/leadprofiles';
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

  //   public UpdatePrifile(model: any) {
  //     const url = 'http://localhost:29224/api/profiles/';

  //     return this.httpClient.post(url, model);
  //   }

  //   public GetUsers(allUsers: any): Observable<User[]> {
  //     const url = 'http://localhost:29224/api/getusers';
  //     let Params = new HttpParams();

  //     // Begin assigning parameters
  //     Params = Params.append('allUsers', allUsers);

  //     return this.httpClient.get<User[]>(url, { params: Params });
  //   }

  //   public GetSource(): Observable<Source[]> {
  //     const url = 'http://localhost:29224/api/getsource';

  //     return this.httpClient.get<Source[]>(url);
  //   }

  //   public AssignProfile(model: any) {
  //     const url = 'http://localhost:29224/api/AssignProfiles';

  //     return this.httpClient.post(url, model);
  //   }

  //   public UploadProfiles(model: any[], source: any) {
  //     const url = 'http://localhost:29224/api/UploadProfiles';
  //     console.log(model.length);
  //     let Params = new HttpParams();

  //     // Begin assigning parameters
  //     Params = Params.append('userId', this.authenticationService.credentials.UserId.toString());
  //     Params = Params.append('sourceId', source);
  //     console.log(Params);
  //     return this.httpClient.post(url, model, { params: Params });
  //   }

  //   public InCompProfile(profileId: any) {
  //     const url = 'http://localhost:29224/api/InCompProfiles';

  //     let Params = new HttpParams();

  //     // Begin assigning parameters
  //     Params = Params.append('userId', this.authenticationService.credentials.UserId.toString());
  //     Params = Params.append('profileId', profileId);

  //     console.log(Params);
  //     return this.httpClient.post(url, { params: Params });
  //   }
}
