import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any = null;

  constructor() {
    if (this.isLocalStorageAvailable()) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
  }

  login(username: string, password: string): boolean {
    // Mock login logic
    if (username === 'rick' && password === 'morty') {
      this.user = { 
        username: 'rick', 
        email: 'rick@example.com', 
        imageUrl: 'https://i.pinimg.com/736x/85/81/47/858147f801932f3c5633c97233531ef2.jpg' // Add image URL
      };
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('user', JSON.stringify(this.user));
      }
      return true;
    }
    return false;
  }

  logout(): void {
    this.user = null;
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('user');
    }
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  getUser(): any {
    return this.user;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}