import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characters-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Import HttpClientModule here
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  character: any;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.httpClient.get(`https://rickandmortyapi.com/api/character/${id}`).subscribe((data: any) => {
      this.character = data;
    });
  }
}