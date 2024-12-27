import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episodes-page',
  standalone: true,
  imports: [CommonModule], // Importa diretivas como *ngFor e *ngIf
  templateUrl: './episodes-page.component.html',
  styleUrls: ['./episodes-page.component.scss'],
})
export class EpisodesPageComponent implements OnInit {
  episodes: any[] = [];
  isLoading = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchEpisodes();
  }

  // Função para buscar os episódios
  fetchEpisodes(): void {
    this.isLoading = true;

    // Endpoint correto para os episódios
    this.httpClient.get('https://rickandmortyapi.com/api/episode').subscribe(
      (data: any) => {
        console.log('Episódios recebidos:', data);
        this.episodes = data.results; // Atualiza a lista de episódios
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar episódios:', error);
        this.isLoading = false;
      }
    );
  }
}
