import { Component, OnInit } from '@angular/core';
import { IndexComponent } from '../../index/index.component';

import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {

  isCourse:boolean=false;

  session:{
    email:string,
    token:string,
    user_id:string,
    name:string
    
  }

  constructor(
    private index: IndexComponent,
    private route:ActivatedRoute,
    private router:Router,
  ) { 

    this.session={
      email:window.sessionStorage.getItem("email"),
      token:window.sessionStorage.getItem("token"),
      user_id:window.sessionStorage.getItem("user_id"),
      name:window.sessionStorage.getItem("name")
    }

    this.route.params.subscribe((params:Params)=>{

      if (params.page === "course"){
        this.isCourse=true;
      }else if(params.page === "lecturer"){
        this.isCourse=false;
      }
  });

    

  }

  ngOnInit() {
  }

  logOut(){
    this.index.logOut();
  }
  

}
