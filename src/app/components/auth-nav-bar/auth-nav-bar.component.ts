import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-nav-bar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './auth-nav-bar.component.html',
  styleUrls: ['./auth-nav-bar.component.scss']
})
export class AuthNavBarComponent {

}
