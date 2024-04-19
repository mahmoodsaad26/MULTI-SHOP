import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthNavBarComponent } from 'src/app/components/auth-nav-bar/auth-nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,AuthNavBarComponent,RouterOutlet,FooterComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

}
