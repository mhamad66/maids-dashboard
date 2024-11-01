import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) {
  }

  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, {
      params: {page: page.toString()}
    });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }
}
