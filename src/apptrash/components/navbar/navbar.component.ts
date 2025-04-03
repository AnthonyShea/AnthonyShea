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
        text: 'SCALIWAG',
        path: 'home',
        customClass: '.red-text', // Add custom class identifier.
        color: 'red'
      },
      {
        id: 1,
        text: 'GENOME BROWSER',
        icon: 'verticalaligntop',
        path: 'igv',
        color: 'red'
      },
      {
        id: 2,
        text: 'GO TERM ENRICHMENT ',
        icon: 'columnfield',
        path: 'go',
        color: 'red'
      },
      {
        id: 3,
        text: 'SEARCH AND DOWNLOAD',
        icon: 'find',
        path: 'search',
        color: 'red'
      },
      {
        id: 4,
        text: 'DOCUMENTATION',
        icon: 'file',
        path: 'documentation',
        color: 'red'
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

  selectTab(event: any) {
    const selectedTab = this.tabs[event.itemIndex];
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
