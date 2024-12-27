import { Component, OnInit, HostListener, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule

interface Seasons {
  season: string;
  viewSeason: string;
}

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, RouterModule], // Add RouterModule here
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})

export class CharactersComponent implements OnInit {

  params = {} as any
  season: Seasons[] = [
    { season: '1', viewSeason: 'Temporada 1' },
    { season: '2', viewSeason: 'Temporada 2' },
    { season: '3', viewSeason: 'Temporada 3' },
    { season: '4', viewSeason: 'Temporada 4' },
    { season: '5', viewSeason: 'Temporada 5' },
  ]
  httpClient = inject(HttpClient);
  characters: any[] = [];
  filteredCharacters: any[] = [];
  info: any = "";  // Para armazenar as informações adicionais (como paginação)
  currentPage = 1;
  isLoading = false;  // Propriedade para controle de loading
  searchTerm: string = ''; // Termo de busca
  characterIds: Set<number> = new Set(); // To track unique character IDs

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    if (this.isLoading) return;  // Evita chamadas simultâneas
    this.isLoading = true;

    this.httpClient.get(`https://rickandmortyapi.com/api/character?page=${this.currentPage}`, { params: this.params }).subscribe((data: any) => {
      const newCharacters = data.results.filter((character: any) => !this.characterIds.has(character.id));
      newCharacters.forEach((character: any) => this.characterIds.add(character.id));
      this.characters = [...this.characters, ...newCharacters];
      this.filteredCharacters = this.characters;  // Atualiza a lista filtrada
      this.info = data.info;
      this.currentPage++;  // Avança para a próxima página
      this.isLoading = false;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Alive':
        return 'green';
      case 'Dead':
        return 'red';
      case 'unknown':
      default:
        return 'gray';
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const bottom = event.target.documentElement.scrollHeight === event.target.documentElement.scrollTop + window.innerHeight;
    if (bottom) {
      this.fetchData();  // Quando chega ao fundo da página, carrega mais personagens
    }
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  filterByStatus(status: string) {
    if (status === 'all') {
      this.filteredCharacters = this.characters;  // Mostra todos os personagens
    } else {
      this.filteredCharacters = this.characters.filter(character => character.status.toLowerCase() === status);
    }
  }

  searchCharacters() {
    this.params.page = 1;
    this.httpClient.get('https://rickandmortyapi.com/api/character', { params: this.params }).subscribe({
      next: (res: any) => {
        this.characters = res.results;
        this.filteredCharacters = this.characters; // Update filteredCharacters
      }
    });
  }

  onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.params.name = input.value;
    this.searchCharacters();
  }
}