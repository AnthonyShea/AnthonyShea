import { Component, OnInit } from '@angular/core';
import bootstrap from 'src/js/bootstrap.js'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    document.getElementById("shadow")!.style.display = "none";
  }
  
  CiteClick(): void {
    window.prompt('Citation', 'Abcd, E., 2025, https://mcaredb.org/');
  }

  showChangelog(): void {
    const changelogToast = document.getElementById("changelogToast");
    bootstrap.Toast.getOrCreateInstance(changelogToast).show();
    document.getElementById("shadow")!.style.display = "block";
  }

  hideChangelog(): void {
    document.getElementById("shadow")!.style.display = "none";
  }

  readChangelog(): void {
    const ChangelogFile = "CHANGELOG.md";
  }
}
