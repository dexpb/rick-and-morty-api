// filepath: /f:/Front-End Projects/L5 Challenge/l5-teste/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { EpisodesPageComponent } from './pages/episodes-page/episodes-page.component';
import { HomeComponent } from './home/home.component';
import { SeasonListComponent } from './season-list/season-list.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CharacterDetailsComponent } from './pages/characters-details/characters-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'characters', component: CharactersComponent }, 
  { path: 'episodes', component: EpisodesPageComponent }, 
  {
    path: 'episodes/season/:season',
    component: SeasonListComponent, 
  },
  { path: 'login', component: LoginComponent }, 
  { path: 'profile', component: ProfileComponent }, 
  { path: 'characters/:id', component: CharacterDetailsComponent },
];