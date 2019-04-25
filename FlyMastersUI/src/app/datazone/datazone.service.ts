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
  apiUrl: string = 'http://localhost:29224/api';

  public GetProfiles(): Observable<Profile[]> {
    const url = this.apiUrl + '/profiles';
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('userId', this.authenticationService.credentials.UserId.toString());
    Params = Params.append('isAdmin', this.authenticationService.credentials.IsAdmin ? 'Yes' : 'No');
    return this.httpClient.get<Profile[]>(url, { params: Params });
  }

  public GetProfileById(id: any): Observable<Profile> {
    const url = this.apiUrl + '/profiles/' + id;

    return this.httpClient.get<Profile>(url);
  }

  public UpdateProfile(model: any) {
    const url = this.apiUrl + '/profiles/';

    return this.httpClient.post(url, model);
  }

  public SaveNotes(model: any) {
    const url = this.apiUrl + '/SaveComments';
    console.log(model);
    return this.httpClient.post(url, model);
  }

  public GetUsers(allUsers: any): Observable<User[]> {
    const url = this.apiUrl + '/getusers';
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('allUsers', allUsers);

    return this.httpClient.get<User[]>(url, { params: Params });
  }

  public GetSource(): Observable<Source[]> {
    const url = this.apiUrl + '/getsource';

    return this.httpClient.get<Source[]>(url);
  }

  public AssignProfile(model: any) {
    const url = this.apiUrl + '/AssignProfiles';

    return this.httpClient.post(url, model);
  }

  public UploadProfiles(model: any[], source: any) {
    const url = this.apiUrl + '/UploadProfiles';
    console.log(model.length);
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('userId', this.authenticationService.credentials.UserId.toString());
    Params = Params.append('sourceId', source);
    console.log(Params);
    return this.httpClient.post(url, model, { params: Params });
  }

  public InCompProfile(model: any) {
    const url = this.apiUrl + '/ProfileIncomplete';

    console.log(model);
    return this.httpClient.post(url, model);
  }
}
