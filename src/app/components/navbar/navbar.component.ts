import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  tabs: any[];
  selected_path: string = '';

  @ViewChild('customTabTemplate', { static: true }) customTabTemplate: TemplateRef<any>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.tabs = [
      {
        id: 0,
        text: 'Home',
        path: 'home',
        customClass: '.nav-link', // Add custom class identifier.
      },
      {
        id: 1,
        text: 'Genome Browser',
        icon: 'verticalaligntop',
        path: 'igv',
      },
      {
        id: 2,
        text: 'Go Term Enrichment',
        icon: 'columnfield',
        path: 'go',
      },
      {
        id: 3,
        text: 'Search & Download',
        icon: 'find',
        path: 'search',
      },
      {
        id: 4,
        text: 'Documentation',
        icon: 'file',
        path: 'documentation',
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.selected_path = event.urlAfterRedirects.split('/')[1];
      this.updateSelectedTab();
    });
    this.selected_path = this.router.url.split('/')[1];
    this.updateSelectedTab();
  }

  selectTab(index: number) {
    const selectedTab = this.tabs[index];
    this.router.navigate([selectedTab.path]);
  }  

  updateSelectedTab() {
    const tabIndex = this.tabs.findIndex(tab => tab.path === this.selected_path);
    if (tabIndex !== -1) {
      setTimeout(() => {
        const tabElement = document.querySelectorAll('.dx-tab')[tabIndex] as HTMLElement;
        if (tabElement) {
          tabElement.click();
        }
      }, 0);
    }
  }
}
