import { HttpHeaders } from '@angular/common/http';
import { User } from './../models/user.model';

export class HttpHelper {
  getCurrentUserToken(): string | undefined {
    const currentUser: { token: string; user: User } = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );

    if (currentUser && currentUser.token) {
      return currentUser.token;
    }

    return undefined;
  }

  setAuthorizationHeaders(): HttpHeaders {
    const token: string | undefined = this.getCurrentUserToken();
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }
}
