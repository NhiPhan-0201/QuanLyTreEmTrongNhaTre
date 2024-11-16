import { HttpClient } from "@angular/common/http";


export default class TokenService {

  constructor() { }

  protected getAuthorization() {
    if (typeof localStorage === 'undefined' || !localStorage.getItem('access_token')) {
      return;
    }
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`
    };
  }
}
