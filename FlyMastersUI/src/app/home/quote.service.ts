import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
export class QuoteService {
  constructor(private httpClient: HttpClient) {}

  result: string[];
  apiUrl: string = 'http://localhost:29224/api';

  getRandomQuote(context: RandomQuoteContext): Observable<string> {
    return this.httpClient
      .cache()
      .get(routes.quote(context))
      .pipe(
        map((body: any) => body.value),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  public GetPrifiles(): Observable<Profile[]> {
    const url = this.apiUrl + '/profiles';

    return this.httpClient.get<Profile[]>(url);
  }

  public GetPrifileById(id: any): Observable<Profile> {
    const url = this.apiUrl + '/profiles/' + id;

    return this.httpClient.get<Profile>(url);
  }

  public UpdatePrifile(model: any) {
    const url = this.apiUrl + '/profiles/';

    return this.httpClient.post(url, model);
  }

  public GetUsers(allUsers: any): Observable<User[]> {
    const url = this.apiUrl + '/getusers';
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('allUsers', allUsers);

    return this.httpClient.get<User[]>(url, { params: Params });
  }

  public SaveNotes(model: any) {
    const url = this.apiUrl + '/SaveComments';
    console.log(model);
    return this.httpClient.post(url, model);
  }
}
