import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems : string[];
  routerUrl : string;


  constructor(private router: Router) {
    this.menuItems = ["Courses","News","Careers","Contact Us"];
    this.routerUrl = this.router.url;
    
    }
    

  ngOnInit() {
  }

  isActive(string){
    if("/"+string === this.routerUrl || "/"+string === "/") {
      
      return true;
    }else{
      return false;
    }
  }

}
