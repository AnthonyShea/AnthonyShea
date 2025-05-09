import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit {

  Version: string = "";
  CompileDate: string = "";

  constructor() { }

  ngOnInit(): void {
    this.Version = AppComponent.Version;
    this.CompileDate = AppComponent.CompileDate;
  }

}
