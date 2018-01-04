import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  pub() {
    console.log('public');
    console.log('public');
    console.log('public');
  }

  private test() {
    console.log('a');
    console.log('a');
    console.log('a');
    console.log('a');
  }
}
