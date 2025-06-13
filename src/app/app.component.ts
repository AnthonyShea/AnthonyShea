import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {

  }
  static Version = "0.2506.19.0";
  static CompileDate = "13 June 2025";
  title = 'Mouse Cardiac Regeneration Database';
}
