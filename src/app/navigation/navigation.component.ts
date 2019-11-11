import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NavItem} from '../models/nav-item';
import {MediaMatcher} from '@angular/cdk/layout';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  title: string;

  mobileQuery: MediaQueryList;

  locations: NavItem[] = [
    {
      routerLink: '/welcome',
      pageName: 'Home',
      icon: 'home'
    },
    {
      routerLink: '/trade',
      pageName: 'Trade',
      icon: 'attach_money'
    },
    {
      routerLink: '/create',
      pageName: 'Create Trade',
      icon: 'add_circle_outline'
    },
    {
      routerLink: '/dashboard',
      pageName: 'Dashboard',
      icon: 'dashboard'
    },
    {
      routerLink: '/messaging',
      pageName: 'Messaging',
      icon: 'message'
    },
  ];

  private mobileQueryListener: () => void;

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        console.log('title', title);
        this.titleService.setTitle(title);
        this.title = title;
      }
    });
  }


  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  constructor(
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  username(): string {
    return this.authService.isLoggedIn() ? this.authService.getCurrentUser() : null;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
