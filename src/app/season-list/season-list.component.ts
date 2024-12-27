import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-season-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Import HttpClientModule here
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss']
})
export class SeasonListComponent implements OnInit {
  episodes: any[] = [];
  filteredEpisodes: any[] = [];
  selectedSeason: number = 1;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const seasonParam = params.get('season');
      this.selectedSeason = seasonParam ? +seasonParam : 1;
      this.episodes = []; // Clear the episodes list
      this.fetchAllEpisodes();
    });
  }

  fetchAllEpisodes(page: number = 1): void {
    this.httpClient
      .get(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .subscribe((data: any) => {
        this.episodes = [...this.episodes, ...data.results];

        if (data.info.next) {
          this.fetchAllEpisodes(page + 1);
        } else {
          this.filterEpisodesBySeason();
        }
      });
  }

  filterEpisodesBySeason(): void {
    this.filteredEpisodes = this.episodes.filter((episode: any) =>
      this.isEpisodeInSeason(episode.episode, this.selectedSeason)
    );
  }

  isEpisodeInSeason(episodeCode: string, season: number): boolean {
    return episodeCode.startsWith(`S${season.toString().padStart(2, '0')}`);
  }

  selectSeason(season: number): void {
    this.selectedSeason = season;
    this.episodes = []; // Clear the episodes list
    this.fetchAllEpisodes(); // Fetch episodes for the selected season
  }
}