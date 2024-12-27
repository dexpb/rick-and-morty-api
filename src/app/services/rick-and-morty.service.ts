import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private currentPage = 1;  // Começa pela página 1

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }
}
