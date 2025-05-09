import { Component, OnInit } from '@angular/core';
import bootstrap from 'src/js/bootstrap.min.js'
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  Version: string = "";
  CompileDate: string = "";
  constructor() { 

  }

  ngOnInit(): void {
    document.getElementById("shadow-bg")!.style.display = "none";
    this.Version = AppComponent.Version;
    this.CompileDate = AppComponent.CompileDate;
  }
  
  CiteClick(): void {
    window.prompt('Citation', 'Abcd, E., 2025, https://mcaredb.org/');
  }

  showToastControl(control_id: string): void {
    // Don't use the default method of bootstrap here. I don't know why but
    // if you try to use it, probably any else collapse elements won't
    // function normally.
    const changelogToast = document.getElementById(control_id);
    document.getElementById("shadow-bg")!.style.display = "block";
    changelogToast!.style.display = "block";
  }

  hideToastControl(control_id: string): void {
    const changelogToast = document.getElementById(control_id);
    document.getElementById("shadow-bg")!.style.display = "none";
    changelogToast!.style.display = "none";
  }

  readChangelog(): void {
    const ChangelogFile = "CHANGELOG.md";
  }
}
