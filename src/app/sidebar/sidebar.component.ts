import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}
}