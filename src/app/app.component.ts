import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CharactersComponent } from "./pages/characters/characters.component";
import { CommonModule } from '@angular/common';
import { EpisodesPageComponent } from './pages/episodes-page/episodes-page.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  constructor(private router: Router) {}

  navigateToCharactersPage() {
    this.router.navigate(['/characters']);
    this.router.navigate(['/episodes']);
    
  }
}