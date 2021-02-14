import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('http://localhost:8080/users')
  }

  loginUser(username: string) {
    return this.http.post('http://localhost:8080/login', {username: username})
  }
}
