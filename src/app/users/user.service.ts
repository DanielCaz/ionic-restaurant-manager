/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}/users/${user._id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(
      `${environment.apiUrl}/users/${user._id}`,
      user
    );
  }
}
