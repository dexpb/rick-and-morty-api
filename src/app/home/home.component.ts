import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SidebarComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters: any[] = [];
  currentPage: number = 1;
  isLoading: boolean = false;
  characterIds: Set<number> = new Set();
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.httpClient
      .get(`https://rickandmortyapi.com/api/character?page=${this.currentPage}`)
      .subscribe((data: any) => {
        const newCharacters = data.results.filter((character: any) => !this.characterIds.has(character.id));
        newCharacters.forEach((character: any) => this.characterIds.add(character.id));
        this.characters = [...this.characters, ...newCharacters];
        this.currentPage++;
        this.isLoading = false;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const bottom = event.target.documentElement.scrollHeight === event.target.documentElement.scrollTop + window.innerHeight;
    if (bottom) {
      this.fetchCharacters();
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Alive':
        return 'green';
      case 'Dead':
        return 'red';
      default:
        return 'gray';
    }
  }
}