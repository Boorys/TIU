import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }


  gotToTable()
  {
    this.router.navigate(['table'])
  }

  gotToWindow()
  {
    this.router.navigate(['window'])
  }
  gotToLogin()
  {
   
    this.router.navigate(['login'])
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  }


}
