import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Profile } from '../Models/profile';

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

  getRandomQuote(context: RandomQuoteContext): Observable<string> {
    return this.httpClient
      .cache()
      .get(routes.quote(context))
      .pipe(
        map((body: any) => body.value),
        catchError(() => of('Error, could not load joke :-('))
      );
  }
  /*GetPrifiles(): Observable<User[]> {
    return this.httpClient
      .cache()
      .get('/profiles')
      .pipe(
        map((response:Response) => response.json()),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  GetPrifiles(): Observable<User> {
    return this.httpClient.get('/profiles/4')
        .map((response:Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetPrifiles(): Observable<User> {
    return this.httpClient
      .cache()
      .get('api/profiles/4')
      .pipe(
        map((body: any) => body.json()),
        catchError(() => of('Error, could not load joke :-('))
      );
  }*/

  public GetPrifiles(): Observable<Profile[]> {
    const url = 'http://localhost:29224/api/profiles';

    return this.httpClient.get<Profile[]>(url);
  }

  public GetPrifileById(id:any): Observable<Profile> {
    const url = 'http://localhost:29224/api/profiles/'+ id;

    return this.httpClient.get<Profile>(url);
  }

  public UpdatePrifile(model:any) {
    const url = 'http://localhost:29224/api/profiles/';   

    return this.httpClient.post(url,model);
  }
}
