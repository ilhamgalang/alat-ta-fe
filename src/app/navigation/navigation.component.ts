import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  currentPath: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.currentPath = localStorage.getItem('cCurrentPath');
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
