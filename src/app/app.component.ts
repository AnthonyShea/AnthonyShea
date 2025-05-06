import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chewie';
  CiteClick(): void {
    window.prompt('Citation', 'Abcd, E., 2025, https://mcaredb.org/');
  }
}
