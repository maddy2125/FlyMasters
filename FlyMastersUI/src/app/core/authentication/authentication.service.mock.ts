import { Observable, of } from 'rxjs';

import { Credentials, LoginContext } from './authentication.service';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    UserName: 'test',
    Status: 'Success',
    token: '123',
    IsAdmin: true,
    UserId: 1
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      UserName: context.username,
      Status: 'Success',
      token: '123456',
      IsAdmin: false,
      UserId: 2
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }
}
