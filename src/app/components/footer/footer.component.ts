import { Component, OnInit } from '@angular/core';
import bootstrap from 'src/js/bootstrap.min.js'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {


  constructor() { 

  }

  ngOnInit(): void {
    document.getElementById("shadow-bg")!.style.display = "none";
    // bootstrap.Toast.getOrCreateInstance(changelogToast).show();
  }
  
  CiteClick(): void {
    window.prompt('Citation', 'Abcd, E., 2025, https://mcaredb.org/');
  }

  showChangelog(): void {
    // Don't use the default method of bootstrap here. I don't know why but
    // if you try to use it, probably any else collapse elements won't
    // function normally.
    const changelogToast = document.getElementById("changelogToast");
    document.getElementById("shadow-bg")!.style.display = "block";
    changelogToast!.style.display = "block";
  }

  hideChangelog(): void {
    const changelogToast = document.getElementById("changelogToast");
    document.getElementById("shadow-bg")!.style.display = "none";
    changelogToast!.style.display = "none";
  }

  readChangelog(): void {
    const ChangelogFile = "CHANGELOG.md";
  }
}
