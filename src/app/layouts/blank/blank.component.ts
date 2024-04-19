import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankNavBarComponent } from 'src/app/components/blank-nav-bar/blank-nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [CommonModule,BlankNavBarComponent,RouterOutlet,FooterComponent],
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent {

  scrollToTop():void{
    scrollTo(0,0)
  }

}
